import React from "react";
import SearchBar from "../components/landingPage/SearchBar";
import MoviesBox from "../components/landingPage/MoviesBox";
import NominatedBox from "../components/landingPage/NominatedBox";

import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  landing: {
    padding: "5vh",
  },
}));

function Landing(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.landing}>
      <Grid item>
        <SearchBar />
      </Grid>
      <Grid item container direction="row" justify="center">
        <Grid item lg={6} md={6}>
          <MoviesBox />
        </Grid>
        <Grid item lg={6} md={6}>
          <NominatedBox />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Landing;
