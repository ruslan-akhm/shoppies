import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import defaultPoster from "../../img/defaultPoster.png";

import { Grid, Typography, Button } from "@material-ui/core";

function NominatedBox(props) {
  const dispatch = useContext(MovieDispatchContext);
  const { nominated } = useContext(MovieStateContext);
  return (
    <Grid container style={{ border: "1px solid green" }}>
      {nominated &&
        nominated.map(movie => {
          return (
            <Grid item key={movie.imdbID} style={{ border: "1px solid red" }}>
              <Typography>{movie.Title}</Typography>
              <Typography>{movie.Year}</Typography>
              <img src={movie.Poster == "N/A" ? defaultPoster : movie.Poster} />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default NominatedBox;
