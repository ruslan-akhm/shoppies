import React from "react";
import SearchBar from "../../components/landingPage/SearchBar";
import MoviesBox from "../../components/landingPage/MoviesBox";
import NominatedBox from "../../components/landingPage/NominatedBox";

import { Grid } from "@material-ui/core";

function Landing(props) {
  return (
    <Grid container direction="column">
      <Grid item>
        <SearchBar />
      </Grid>
      <Grid item container direction="row">
        <Grid item>
          <MoviesBox />
        </Grid>
        <Grid item>
          <NominatedBox />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Landing;
