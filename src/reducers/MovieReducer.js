import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  ADD_NOMINEE,
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
        searchQuery: payload.searchQuery,
        searchResult: state.searchResult.concat(payload.movies),
        moviesShown: state.moviesShown + payload.movies.length,
        totalResults: payload.totalResults,
      };
    case LOAD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case ADD_NOMINEE:
      console.log(state.searchResult);
      //disable "nominate" button
      return {
        ...state,
        nominated: state.nominated.concat(payload.movie),
      };

    default:
      return state;
  }
};
