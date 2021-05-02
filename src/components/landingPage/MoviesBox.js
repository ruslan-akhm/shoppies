import { useEffect, useContext, useState } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { UserContext } from "../../context/UserContext";
import { loadNextPage, nominateMovie } from "../../actions/Movies";
import ModalBox from "./ModalBox";
import defaultPoster from "../../img/defaultPoster.png";

import { Grid, Typography, Button } from "@material-ui/core";

function MoviesBox(props) {
  const { setMaxReachedModal } = useContext(UserContext);
  const dispatch = useContext(MovieDispatchContext);
  const {
    loading,
    error,
    searchQuery,
    searchResult,
    totalResults,
    moviesShown,
    nominated,
  } = useContext(MovieStateContext);

  useEffect(() => {
    nominated.length === 5 && setMaxReachedModal(true);
  }, [nominated]);

  const loadMore = () => {
    loadNextPage(dispatch, {
      moviesShown: moviesShown,
      searchQuery: searchQuery,
    });
  };

  const nominate = e => {
    if (nominated.length === 5) {
      return setMaxReachedModal(true);
    }
    nominateMovie(dispatch, { movie: e });
  };

  return (
    <Grid container direction="column">
      {searchResult &&
        searchResult.map((movie, index) => {
          return (
            <Grid item key={index} style={{ border: "1px solid red" }}>
              <Typography>{movie.Title}</Typography>
              <Typography>{movie.Year}</Typography>
              <img src={movie.Poster == "N/A" ? defaultPoster : movie.Poster} />
              <Button
                variant="contained"
                onClick={e => nominate(movie)}
                disabled={movie.nominated ? true : false}
              >
                Nominate
              </Button>
              {movie.nominated ? (
                <Typography>You have nominated this movie</Typography>
              ) : null}
            </Grid>
          );
        })}
      <Grid item>
        {totalResults && +totalResults > moviesShown ? (
          <Button onClick={loadMore}>Load more</Button>
        ) : null}
      </Grid>
      {loading && <Typography>LOADING</Typography>}
      {error ? (
        searchQuery.length === 0 ? (
          <Typography>Type in movie name, for example "Rush Hour"</Typography>
        ) : (
          <Typography>Try narrowing down the search</Typography>
        )
      ) : null}
      <ModalBox />
    </Grid>
  );
}

export default MoviesBox;
