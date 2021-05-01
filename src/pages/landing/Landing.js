import React from "react";
import SearchBar from "../../components/landingPage/SearchBar";

import { Grid } from "@material-ui/core";

function Landing(props) {
  return (
    <Grid container>
      <Grid item>
        <SearchBar />
      </Grid>
    </Grid>
  );
}

export default Landing;
