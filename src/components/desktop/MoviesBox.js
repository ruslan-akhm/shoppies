import { useState, useEffect, useContext, useRef } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { UserContext } from "../../context/UserContext";
import { loadNextPage } from "../../actions/Movies";
import ModalBox from "../ModalBox";

import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import MovieCard from "../MovieCard";

const useStyles = makeStyles(theme => ({
  boxTitle: {
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    backgroundColor: theme.palette.solidGray.main,
    color: "#fff",
  },
  loadButton: {
    backgroundColor: theme.palette.solidGray.main,
    color: "#fff",
    margin: "auto",
    width: "50%",
    "&:hover": {
      backgroundColor: theme.palette.lightGray.main,
      color: theme.palette.solidGray.main,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(5),
    },
  },
  loadingBox: {
    width: "100%",
    height: "15vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.lightGray.main,
    marginTop: theme.spacing(2),
  },
  moviesBox: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

function MoviesBox(props) {
  const classes = useStyles();
  const { setMaxReachedModal } = useContext(UserContext);
  const dispatch = useContext(MovieDispatchContext);
  const {
    loading,
    error,
    searchQuery,
    searchResult,
    totalResults,
    moviesShown,
    nominated,
  } = useContext(MovieStateContext);
  const initRender = useRef(true);

  useEffect(() => {
    //modal is shown when 5th nominee added. If we navigate to nominees (in mobile) and return back
    //to movies box - we won't see modal on the 1st render (while having 5 nominees), because of the initRender ref
    !initRender.current && nominated.length === 5 && setMaxReachedModal(true);
    initRender.current = false;
  }, [nominated]);

  const loadMore = () => {
    loadNextPage(dispatch, {
      moviesShown: moviesShown,
      searchQuery: searchQuery,
    });
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="flex-start"
        id="movies-box"
        className={classes.moviesBox}
      >
        {searchResult &&
          searchResult.map((movie, index) => {
            return (
              <MovieCard
                movie={movie}
                index={index}
                key={index}
                caller="MoviesBox"
              />
            );
          })}
        {/* <Grid item> */}

        {/* </Grid> */}
        {loading && (
          <Box className={classes.loadingBox}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {error && searchQuery.length !== 0 ? (
          <Typography className={classes.message}>
            Try narrowing down the search
          </Typography>
        ) : null}
        <ModalBox />
      </Grid>
      {!loading && totalResults && +totalResults > moviesShown ? (
        <Button
          onClick={loadMore}
          className={classes.loadButton}
          variant="contained"
        >
          Load more
        </Button>
      ) : null}
    </>
  );
}

export default MoviesBox;
