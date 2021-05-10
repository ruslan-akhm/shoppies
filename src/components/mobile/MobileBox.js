import { useContext } from "react";
import SearchBar from "../SearchBar";
import MoviesBox from "../desktop/MoviesBox";
import NominatedBox from "../desktop/NominatedBox";
import { UserContext } from "../../context/UserContext";

import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  logo: {
    width: "auto",
    margin: "auto",
    height: theme.spacing(6),
    marginTop: theme.spacing(1),
  },
  searchBarWrapper: {
    paddingBottom: theme.spacing(1),
    position: "sticky",
    top: "0",
    zIndex: "3",
    backgroundColor: theme.palette.background.main,
  },
}));

function MobileBox(props) {
  const classes = useStyles();
  const { inView } = useContext(UserContext);

  return (
    <Grid container direction="column">
      {inView === "MoviesBox" ? (
        <>
          <Grid
            item
            container
            direction="row"
            className={classes.searchBarWrapper}
          >
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
