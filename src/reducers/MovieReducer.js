import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  LOAD_PAGE,
  LOAD_NEXT_PAGE_SUCCESS,
  ADD_NOMINEE,
  REMOVE_NOMINEE,
} from "../actions/Types";

export const initialState = {
  loading: false,
  error: false,
  searchQuery: null,
  searchResult: [],
  moviesShown: 0,
  totalResults: 0,
  nominated: JSON.parse(localStorage.getItem("nominatedMovies"))
    ? JSON.parse(localStorage.getItem("nominatedMovies"))
    : [],
};

export const MovieReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_DATA:
      //clearing searchResult, moviesShown and totalResults because if we load data - it means user is typing other
      //movie title in the search bar, so we are clearing current state
      return {
        ...state,
        loading: true,
        error: false,
        searchResult: [],
        moviesShown: 0,
        totalResults: 0,
      };

    case LOAD_DATA_SUCCESS:
      //checking to see if we have a movie in nominees list and updating movie.nominated parameter correspondingly
      const nominatedIds =
        state.nominated &&
        state.nominated.map(movie => {
          return movie.imdbID;
        });
      const moviesWithNominees =
        nominatedIds &&
        payload.movies.map(movie => {
          movie.nominated = nominatedIds.includes(movie.imdbID)
            ? true
            : movie.nominated;
          return movie;
        });
      return {
        ...state,
        loading: false,
        error: false,
        searchQuery: payload.searchQuery,
        searchResult: moviesWithNominees,
        moviesShown: payload.movies.length,
        totalResults: payload.totalResults,
      };

    case LOAD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        searchQuery: payload.searchQuery,
        searchResult: [],
        moviesShown: 0,
        totalResults: 0,
      };

    case LOAD_PAGE:
      return {
        ...state,
        loading: true,
      };

    case LOAD_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: state.searchResult.concat(payload.movies),
        moviesShown: state.moviesShown + payload.movies.length,
      };

    case ADD_NOMINEE:
      //checking to see if we have a movie in nominees list and updating movie.nominated parameter correspondingly
      const updatedSearchResult = state.searchResult.map(movie => {
        movie.nominated =
          movie.imdbID === payload.movie.imdbID ? true : movie.nominated;
        return movie;
      });
      localStorage.setItem(
        "nominatedMovies",
        JSON.stringify(state.nominated.concat(payload.movie))
      );
      return {
        ...state,
        searchResult: updatedSearchResult,
        nominated: state.nominated.concat(payload.movie),
      };

    case REMOVE_NOMINEE:
      const updatedNominated = state.nominated.filter(movie => {
        return movie.imdbID !== payload.movie.imdbID;
      });
      const updatedSearch = state.searchResult.map(movie => {
        movie.nominated =
          movie.imdbID === payload.movie.imdbID ? false : movie.nominated;
        return movie;
      });
      localStorage.setItem("nominatedMovies", JSON.stringify(updatedNominated));
      return {
        ...state,
        searchResult: updatedSearch,
        nominated: updatedNominated,
      };

    default:
      return state;
  }
};
