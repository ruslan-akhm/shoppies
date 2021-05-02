import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
} from "../actions/Types";

export const initialState = {
  loading: false,
  error: false,
  searchResult: null,
  moviesShown: null,
  totalResults: null,
  nominated: null,
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
        searchResult: payload.movies,
        moviesShown: payload.movies.length,
        totalResults: payload.totalResults,
      };
    case LOAD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
