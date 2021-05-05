import axios from "axios";
import { QueryClient } from "react-query";
import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  LOAD_PAGE,
  LOAD_NEXT_PAGE_SUCCESS,
  ADD_NOMINEE,
  REMOVE_NOMINEE,
} from "./Types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const key = "7f58ee09"; //API key for OMDB

export const getData = async (dispatch, payload) => {
  try {
    dispatch({ type: LOAD_DATA });
    // replace spaces with dashes in order to get correct results
    const movie = payload.searchQuery.replace(/\s/g, "-");
    //Saving fetched data in cache for 5min
    const data = await queryClient.fetchQuery(
      movie,
      async () => {
        try {
          const resp = await axios.get(
            `http://www.omdbapi.com/?s=${movie}&type=movie&apikey=${key}`
          );
          return resp;
        } catch (err) {
          return console.log(err);
        }
      },
      {
        staleTime: 300000, //5 min
      }
    );

    //if there are no movies found
    if (data.data.Response === "False") {
      return dispatch({
        type: LOAD_DATA_FAILURE,
        payload: {
          searchQuery: payload.searchQuery,
        },
      });
    }

    return dispatch({
      type: LOAD_DATA_SUCCESS,
      payload: {
        searchQuery: payload.searchQuery,
        movies: data.data.Search,
        totalResults: data.data.totalResults,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const loadNextPage = async (dispatch, payload) => {
  //Only 10 movies MAX per page can be shown. 1st page - 10 movies max, 2nd page - 20 movies max, etc.
  //therefore current page is number of movies shown divided by ten (payload.moviesShown/10)
  //to load next page our "page" query param would be (payload.moviesShown/10 + 1)
  try {
    dispatch({
      type: LOAD_PAGE,
    });
    //Saving fetched data in cache for 5min
    const queryKey = payload.searchQuery + (payload.moviesShown / 10 + 1); //unique key for every page
    const data = await queryClient.fetchQuery(
      queryKey,
      async () => {
        try {
          const resp = await axios.get(
            `http://www.omdbapi.com/?s=${payload.searchQuery}&type=movie&page=${
              payload.moviesShown / 10 + 1
            }&apikey=${key}`
          );
          return resp;
        } catch (err) {
          return console.log(err);
        }
      },
      {
        staleTime: 300000, // 5 min
      }
    );

    return dispatch({
      type: LOAD_NEXT_PAGE_SUCCESS,
      payload: {
        movies: data.data.Search,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const nominateMovie = (dispatch, payload) => {
  dispatch({ type: ADD_NOMINEE, payload: { movie: payload.movie } });
};

export const removeNominee = (dispatch, payload) => {
  dispatch({ type: REMOVE_NOMINEE, payload: { movie: payload.movie } });
};
