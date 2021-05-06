import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../context/MovieContext";
import { UserContext } from "../context/UserContext";
import { nominateMovie, removeNominee } from "../actions/Movies";
import defaultPoster from "../img/defaultPoster.png";

import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Link,
  Fade,
  Grow,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";

const useStyles = makeStyles(theme => ({
  bottomMessage: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    color: theme.palette.green.main,
  },
  cardInfo: {
    padding: theme.spacing(2),
  },
  cardTitle: {
    height: "fit-content",
    color: "#fff",
  },
  link: {
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "600",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  movieCard: {
    marginBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.solidGray.main}`,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column !important",
    },
  },
  button: {
    marginTop: "auto",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(3),
    },
  },
  poster: {
    width: "100%",
    height: "100%",
    maxHeight: "300px",
    minHeight: "200px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "320px",
      height: "320px",
      objectPosition: "top",
    },
  },
}));

function MovieCard(props) {
  const classes = useStyles();
  const { setMaxReachedModal } = useContext(UserContext);
  const dispatch = useContext(MovieDispatchContext);
  const { nominated } = useContext(MovieStateContext);

  const { movie, index, caller } = props;

  const nominate = e => {
    if (nominated.length === 5) {
      return setMaxReachedModal(true);
    }
    nominateMovie(dispatch, { movie: e });
  };

  const remove = e => {
    removeNominee(dispatch, { movie: e });
  };

  return (
    <Fade in={index >= 0} key={movie.imdbID}>
      <Grid
        item
        container
        className={classes.movieCard}
        direction="row"
        lg={12}
        md={12}
      >
        <Grid item lg={3} md={3} sm={4}>
          <img
            className={classes.poster}
            src={movie.Poster === "N/A" ? defaultPoster : movie.Poster}
            alt={movie.Title + " poster"}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          lg={9}
          md={9}
          sm={8}
          className={classes.cardInfo}
        >
          <Typography className={classes.cardTitle} variant="h5">
            {movie.Title} ({movie.Year})
          </Typography>
          {caller === "MoviesBox" ? (
            <Link
              href={"https://www.imdb.com/title/" + movie.imdbID}
              target="_blank"
              rel="noopener"
              className={classes.link}
            >
              imdb <OpenInNewIcon fontSize="inherit" />
            </Link>
          ) : null}
          {caller === "MoviesBox" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={e => nominate(movie)}
              disabled={movie.nominated ? true : false}
              className={classes.button}
            >
              Nominate
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={e => remove(movie)}
              className={classes.button}
            >
              Remove
            </Button>
          )}
        </Grid>
        {caller === "MoviesBox" && movie.nominated ? (
          <Grow in={caller === "MoviesBox" && movie.nominated}>
            <Typography className={classes.bottomMessage}>
              You have nominated this movie{" "}
              <DoneOutlineOutlinedIcon fontSize="inherit" />
            </Typography>
          </Grow>
        ) : null}
      </Grid>
    </Fade>
  );
}

export default MovieCard;
