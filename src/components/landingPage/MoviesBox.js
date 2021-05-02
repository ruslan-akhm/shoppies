import { useContext } from "react";
import { MovieStateContext } from "../../context/MovieContext";
import defaultPoster from "../../img/defaultPoster.png";

import { Grid, Typography, Button } from "@material-ui/core";

function MoviesBox(props) {
  const { loading, searchResult, totalResults } = useContext(MovieStateContext);
  console.log(searchResult);
  return (
    <Grid container direction="column">
      {searchResult &&
        searchResult.map(movie => {
          return (
            <Grid item style={{ border: "1px solid red" }}>
              <Typography>{movie.Title}</Typography>
              <Typography>{movie.Year}</Typography>
              <img src={movie.Poster == "N/A" ? defaultPoster : movie.Poster} />
              <Button variant="contained">Nominate</Button>
            </Grid>
          );
        })}
      <Grid item>
        {totalResults && totalResults > 10 ? <Button>Load more</Button> : null}
      </Grid>
      {loading && <Typography>LOADING</Typography>}
    </Grid>
  );
}

export default MoviesBox;
