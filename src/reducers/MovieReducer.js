import { GET_DATA } from "../actions/Types";

export const initialState = {
  loading: false,
  searchResult: null,
  nominated: null,
};

export const MovieReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DATA:
      return {
        ...state,
        loading: true,
        searchResult: payload.movies,
      };

    default:
      return state;
  }
};
