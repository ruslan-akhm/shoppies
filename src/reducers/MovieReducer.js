import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  LOAD_NEXT_PAGE,
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
  nominated: [],
};

export const MovieReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        searchQuery: payload.searchQuery,
        searchResult: payload.movies, //state.searchResult.concat(),
        //add LOAD_NEXT_PAGE
        //remove concat from here
        moviesShown: payload.movies.length, //state.moviesShown +
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

    case LOAD_NEXT_PAGE:
      return {
        ...state,
        loading: false,
        //searchQuery: payload.searchQuery,
        searchResult: state.searchResult.concat(payload.movies),
        moviesShown: state.moviesShown + payload.movies.length,
        //totalResults: payload.totalResults,
      };

    case ADD_NOMINEE:
      const updatedSearchResult = state.searchResult.map(movie => {
        movie.nominated =
          movie.imdbID === payload.movie.imdbID ? true : movie.nominated;
        return movie;
      });
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
      return {
        ...state,
        searchResult: updatedSearch,
        nominated: updatedNominated,
      };

    default:
      return state;
  }
};
