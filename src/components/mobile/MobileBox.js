import { useContext } from "react";
import SearchBar from "../SearchBar";
import MoviesBox from "../desktop/MoviesBox";
import NominatedBox from "../desktop/NominatedBox";
import { UserContext } from "../../context/UserContext";
import logo from "../../img/logo.png";

import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  logo: {
    width: "auto",
    margin: "auto",
    height: theme.spacing(6),

    marginTop: theme.spacing(1),
  },
}));

function MobileBox(props) {
  const classes = useStyles();
  const { inView, inputFocused } = useContext(UserContext);

  return (
    <Grid container direction="column" style={{ boxSizing: "border-box" }}>
      {inView === "MoviesBox" ? (
        <>
          <Grid item container direction="row">
            <SearchBar />
          </Grid>
          <MoviesBox />
        </>
      ) : (
        <Grid item>
          <NominatedBox />
        </Grid>
      )}
    </Grid>
  );
}

export default MobileBox;
