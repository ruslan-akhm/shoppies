import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../context/MovieContext";
import { UserContext } from "../context/UserContext";
import { nominateMovie, removeNominee } from "../actions/Movies";
import defaultPoster from "../img/defaultPoster.png";

import { makeStyles, Grid, Typography, Button, Fade } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  cardTitle: {
    position: "absolute",
    top: theme.spacing(-2),
    maxWidth: "85%",
    paddingLeft: "5px",
    paddingRight: "5px",
    height: "auto",
    color: "#fff",
    backgroundColor: theme.palette.solidGray.main,
    zIndex: "1",
    fontWeight: "600",
    borderRadius: "4px",
    textAlign: "center",
    wordBreak: "break-word",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "85%",
      width: "85%",
    },
  },
  movieCard: {
    position: "relative",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      minHeight: "250px",
      height: "45vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "30vh",
    },
  },
  button: {
    position: "absolute",
    bottom: theme.spacing(-1),
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  poster: {
    width: "auto",
    maxWidth: "95%",
    height: "100%",
    objectFit: "cover",
    [theme.breakpoints.up("md")]: {
      height: "40vh",
    },
    [theme.breakpoints.down("sm")]: {
      objectPosition: "top center",
    },
  },
  posterFilter: {
    filter: "saturate(0.7) opacity(0.85) brightness(95%)",
  },
}));

function MovieCard(props) {
  const classes = useStyles();
  const { setMaxReachedModal } = useContext(UserContext);
  const dispatch = useContext(MovieDispatchContext);
  const { nominated } = useContext(MovieStateContext);

  const { movie, index, caller } = props;

  const nominate = e => {
    //show pop-up modal if there are already 5 movies nominated
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
        xl={caller === "MoviesBox" ? 3 : 2}
        lg={caller === "MoviesBox" ? 3 : 2}
        md={caller === "MoviesBox" ? 3 : 2}
        sm={4}
        xs={4}
        container
        direction="column"
        className={classes.movieCard}
        justify="center"
        alignItems="center"
      >
        <Grid item className={classes.cardTitle}>
          <Typography variant="subtitle2">
            {movie.Title}, {movie.Year}
          </Typography>
        </Grid>
        <img
          className={classes.poster + " " + classes.posterFilter}
          src={movie.Poster === "N/A" ? defaultPoster : movie.Poster}
          alt={movie.Title + " poster"}
        />

        {caller === "MoviesBox" ? (
          !movie.nominated && (
            <Button
              variant="contained"
              color="primary"
              onClick={e => nominate(movie)}
              className={classes.button}
            >
              Nominate
            </Button>
          )
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
    </Fade>
  );
}

export default MovieCard;
