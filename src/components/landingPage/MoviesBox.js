import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { getData, nominateMovie } from "../../actions/Movies";
import defaultPoster from "../../img/defaultPoster.png";

import { Grid, Typography, Button } from "@material-ui/core";

function MoviesBox(props) {
  const dispatch = useContext(MovieDispatchContext);
  const {
    loading,
    searchQuery,
    searchResult,
    totalResults,
    moviesShown,
    nominated,
  } = useContext(MovieStateContext);

  const loadMore = () => {
    getData(dispatch, {
      moviesShown: moviesShown,
      searchQuery: searchQuery,
    });
  };

  const nominate = e => {
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
    </Grid>
  );
}

export default MoviesBox;
