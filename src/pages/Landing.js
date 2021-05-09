import SearchBar from "../components/SearchBar";
import MoviesBox from "../components/desktop/MoviesBox";
import NominatedBox from "../components/desktop/NominatedBox";
import BottomBar from "../components/mobile/BottomBar";
import MobileBox from "../components/mobile/MobileBox";

import {
  makeStyles,
  Grid,
  Hidden,
  ClickAwayListener,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { MovieStateContext } from "../context/MovieContext";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  landing: {
    minHeight: "100vh",
    padding: "5vh",
    paddingBottom: "10vh",
    backgroundColor: theme.palette.background.main,
    [theme.breakpoints.down("sm")]: {
      padding: "0vh",
      paddingBottom: "10vh",
    },
  },
  moviesBoxContainer: {
    position: "absolute",
    top: theme.spacing(8),
    right: "0",
    zIndex: "2",
    backgroundColor: theme.palette.gray.main,
    height: "60vh",
    overflowY: "auto",
    width: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  resultsFor: {
    textAlign: "center",
    padding: theme.spacing(1),
    color: theme.palette.solidGray.main,
  },
  wrapper: {
    position: "relative",
  },
}));

function Landing(props) {
  const classes = useStyles();
  const { showMovies, setShowMovies } = useContext(UserContext);
  const { searchQuery } = useContext(MovieStateContext);

  const handleClickAway = () => {
    setShowMovies(false);
  };

  return (
    <Grid container direction="column" className={classes.landing}>
      <Hidden smDown>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid item container className={classes.wrapper}>
            <SearchBar />

            {showMovies ? (
              <Grid
                id="movies-box"
                item
                lg={10}
                md={10}
                className={classes.moviesBoxContainer}
              >
                <Typography variant="body1" className={classes.resultsFor}>
                  Results for: "{searchQuery}"
                </Typography>
                <MoviesBox />
              </Grid>
            ) : null}
          </Grid>
        </ClickAwayListener>

        <Grid item xl={12} lg={12} md={12}>
          <NominatedBox />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <MobileBox />
        <BottomBar />
      </Hidden>
    </Grid>
  );
}

export default Landing;
