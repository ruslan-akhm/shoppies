import { useEffect, useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { UserContext } from "../../context/UserContext";
import { loadNextPage, nominateMovie } from "../../actions/Movies";
import ModalBox from "./ModalBox";
import defaultPoster from "../../img/defaultPoster.png";

import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Button,
  Link,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";

const useStyles = makeStyles(theme => ({
  bottomMessage: {
    //border: "1px solid red",
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    color: theme.palette.green.main,
  },
  boxTitle: {
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    backgroundColor: theme.palette.solidGray.main,
    color: "#fff",
  },
  cardInfo: {
    padding: theme.spacing(2),
  },
  cardTitle: {
    height: "fit-content",
  },
  link: {
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "600",
  },
  //UPDATE HOVER OF THIS BTN
  loadButton: {
    //border: "1px solid red",
    backgroundColor: theme.palette.solidGray.main,
    color: "#fff",
  },
  loadingBox: {
    width: "100%",
    height: "50vh",
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
    padding: theme.spacing(3),
    // border: "1px solid red",
  },
  movieCard: {
    marginBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.solidGray.main}`,
  },
  nominateButton: {
    marginTop: "auto",
  },
  poster: {
    width: "100%",
    height: "100%",
    maxHeight: "300px",
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
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.moviesBox}
    >
      <Typography className={classes.boxTitle}>
        Results for: {searchQuery}
      </Typography>
      {searchResult &&
        searchResult.map((movie, index) => {
          return (
            <Fade in={index >= 0} key={movie.imdbID}>
              <Grid
                item
                container
                //key={index}
                className={classes.movieCard}
                direction="row"
                lg={12}
                md={12}
              >
                <Grid item lg={3} md={3}>
                  <img
                    className={classes.poster}
                    src={movie.Poster == "N/A" ? defaultPoster : movie.Poster}
                    alt={movie.Title + " poster"}
                  />
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  lg={9}
                  md={9}
                  className={classes.cardInfo}
                >
                  <Typography className={classes.cardTitle} variant="h5">
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
                    color="primary"
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
            </Fade>
          );
        })}
      <Grid item>
        {totalResults && +totalResults > moviesShown ? (
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
