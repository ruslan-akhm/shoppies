import { useContext, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MoviesBox from "../components/desktop/MoviesBox";
import NominatedBox from "../components/desktop/NominatedBox";
import BottomBar from "../components/mobile/BottomBar";
import MobileBox from "../components/mobile/MobileBox";
import { loadNextPage } from "../actions/Movies";
import { UserContext } from "../context/UserContext";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../context/MovieContext";

import {
  makeStyles,
  Grid,
  Hidden,
  ClickAwayListener,
  Typography,
} from "@material-ui/core";

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
    boxShadow: `0px 4px 10px 10px ${theme.palette.lightGray.main}`,
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
  const dispatch = useContext(MovieDispatchContext);
  const { moviesShown, searchQuery } = useContext(MovieStateContext);
  const { showMovies, setShowMovies } = useContext(UserContext);

  useEffect(() => {
    if (showMovies && searchQuery && moviesShown > 0) {
      if (document.getElementById("movies-box") !== null) {
        const box = document.getElementById("movies-box");
        box.addEventListener("scroll", () => {
          if (box.scrollTop > box.scrollHeight * 0.6) {
            loadNextPage(dispatch, {
              moviesShown: moviesShown,
              searchQuery: searchQuery,
            });
          }
        });
      }
    }
  }, [showMovies, searchQuery, moviesShown]);

  const handleClickAway = () => {
    setShowMovies(false);
  };

  return (
    <Grid container direction="column" className={classes.landing}>
      {/*Desktop Layout*/}
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
      {/*Mobile Layout*/}
      <Hidden mdUp>
        <MobileBox />
        <BottomBar />
      </Hidden>
    </Grid>
  );
}

export default Landing;
