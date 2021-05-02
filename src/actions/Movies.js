import axios from "axios";
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE } from "./Types";

const key = "7f58ee09"; //API key for OMDB

export const getData = async (dispatch, payload) => {
  try {
    dispatch({ type: LOAD_DATA });
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${payload}&apikey=${key}`
    );
    if (response.data.reponse === "False") {
      return dispatch({ type: LOAD_DATA_FAILURE });
    }

    return dispatch({
      type: LOAD_DATA_SUCCESS,
      payload: {
        movies: response.data.Search,
        totalResults: response.data.totalResults,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
