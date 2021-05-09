import { useEffect, useContext, useRef } from "react";
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
    "&:hover": {
      backgroundColor: theme.palette.lightGray.main,
      color: theme.palette.solidGray.main,
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
    //border: "1px solid red",
    marginTop: theme.spacing(2),
    //maxWidth: "100%",
    paddingBottom: theme.spacing(3),
    //[theme.breakpoints.down("sm")]: {
    //  padding: theme.spacing(1),
    //},
  },
}));

function MoviesBox(props) {
  const classes = useStyles();
  const { setMaxReachedModal, showMovies } = useContext(UserContext);
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
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="flex-start"
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
      <Grid item>
        {!loading && totalResults && +totalResults > moviesShown ? (
          <Button
            onClick={loadMore}
            className={classes.loadButton}
            variant="contained"
          >
            Load more
          </Button>
        ) : null}
      </Grid>
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
  );
}

export default MoviesBox;
