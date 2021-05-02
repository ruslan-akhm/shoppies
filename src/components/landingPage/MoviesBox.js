import { useEffect, useContext, useState } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { UserContext } from "../../context/UserContext";
import { loadNextPage, nominateMovie } from "../../actions/Movies";
import ModalBox from "./ModalBox";
import defaultPoster from "../../img/defaultPoster.png";

import { makeStyles, Grid, Typography, Button, Link } from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";

const useStyles = makeStyles(theme => ({
  bottomMessage: {
    border: "1px solid red",
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    color: theme.palette.green.main,
  },
  boxTitle: {
    width: "auto",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    border: "1px solid red",
  },
  cardInfo: {
    padding: theme.spacing(2),
  },
  cardTitle: {
    height: "fit-content",
    border: "1px solid red",
  },
  link: {
    border: "1px solid red",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "600",
  },
  moviesBox: {
    padding: theme.spacing(3),
  },
  movieCard: {
    marginBottom: theme.spacing(3),
  },
  nominateButton: {
    marginTop: "auto",
  },
  poster: {
    width: "100%",
    height: "100%",
    minHeight: "180px",
    objectFit: "cover",
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

  useEffect(() => {
    nominated.length === 5 && setMaxReachedModal(true);
  }, [nominated]);

  const loadMore = () => {
    loadNextPage(dispatch, {
      moviesShown: moviesShown,
      searchQuery: searchQuery,
    });
  };

  const nominate = e => {
    if (nominated.length === 5) {
      return setMaxReachedModal(true);
    }
    nominateMovie(dispatch, { movie: e });
  };

  return (
    <Grid container direction="column" className={classes.moviesBox}>
      <Typography className={classes.boxTitle}>
        Results for: {searchQuery}
      </Typography>
      {searchResult &&
        searchResult.map((movie, index) => {
          return (
            <Grid
              item
              container
              key={index}
              className={classes.movieCard}
              direction="row"
              lg={12}
              md={12}
              style={{ border: "1px solid red" }}
            >
              <Grid item lg={3} md={3}>
                <img
                  className={classes.poster}
                  src={movie.Poster == "N/A" ? defaultPoster : movie.Poster}
                />{" "}
              </Grid>
              <Grid
                item
                container
                direction="column"
                lg={9}
                md={9}
                className={classes.cardInfo}
              >
                <Typography className={classes.cardTitle}>
                  {movie.Title} ({movie.Year})
                </Typography>
                <Link
                  href={"https://www.imdb.com/title/" + movie.imdbID}
                  target="_blank"
                  rel="noopener"
                  className={classes.link}
                >
                  imdb <OpenInNewIcon fontSize="inherit" />
                </Link>
                <Button
                  variant="contained"
                  onClick={e => nominate(movie)}
                  disabled={movie.nominated ? true : false}
                  className={classes.nominateButton}
                >
                  Nominate
                </Button>
              </Grid>
              {movie.nominated ? (
                <Typography className={classes.bottomMessage}>
                  You have nominated this movie{" "}
                  <DoneOutlineOutlinedIcon fontSize="inherit" />
                </Typography>
              ) : null}
            </Grid>
          );
        })}
      <Grid item>
        {totalResults && +totalResults > moviesShown ? (
          <Button onClick={loadMore}>Load more</Button>
        ) : null}
      </Grid>
      {loading && <Typography>LOADING</Typography>}

      <ModalBox />
    </Grid>
  );
}

export default MoviesBox;
