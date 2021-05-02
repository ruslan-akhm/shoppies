import axios from "axios";
import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  ADD_NOMINEE,
} from "./Types";

const key = "7f58ee09"; //API key for OMDB

export const getData = async (dispatch, payload) => {
  try {
    dispatch({ type: LOAD_DATA });
    //if we provided payload.moviesShown - means we want load next page, otherwise we load 1st page
    //Only 10 movies MAX per page can be shown. 1st page - 10 movies max, 2nd page - 20 movies max, etc.
    //therefore current page is number of movies shown divided by ten (payload.moviesShown/10)
    //to load next page our "page" query param would be (payload.moviesShown/10 + 1)
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${payload.searchQuery}${
        payload.moviesShown ? "&page=" + (payload.moviesShown / 10 + 1) : ""
      }&apikey=${key}`
    );
    //if there are no movies found
    if (response.data.reponse === "False") {
      return dispatch({ type: LOAD_DATA_FAILURE });
    }
    return dispatch({
      type: LOAD_DATA_SUCCESS,
      payload: {
        searchQuery: payload.searchQuery,
        movies: response.data.Search,
        totalResults: response.data.totalResults,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const nominateMovie = (dispatch, payload) => {
  //console.log(payload);

  dispatch({ type: ADD_NOMINEE, payload: { movie: payload.movie } });
};
