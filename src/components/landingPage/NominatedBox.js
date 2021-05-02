import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { removeNominee } from "../../actions/Movies";
import defaultPoster from "../../img/defaultPoster.png";

import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";

const useStyles = makeStyles(theme => ({
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
  movieCard: {
    marginBottom: theme.spacing(3),
  },
  nominatedBox: {
    padding: theme.spacing(3),
  },
  poster: {
    width: "100%",
    height: "100%",
    minHeight: "180px",
    objectFit: "cover",
  },
  removeButton: {
    marginTop: "auto",
  },
}));

function NominatedBox(props) {
  const classes = useStyles();
  const dispatch = useContext(MovieDispatchContext);
  const { nominated } = useContext(MovieStateContext);

  const remove = e => {
    removeNominee(dispatch, { movie: e });
  };
  return (
    <Grid
      container
      style={{ border: "1px solid green" }}
      direction="column"
      className={classes.nominatedBox}
    >
      <Typography className={classes.boxTitle}>Nominees</Typography>
      {nominated &&
        nominated.map((movie, index) => {
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
                <Button
                  variant="contained"
                  onClick={e => remove(movie)}
                  className={classes.removeButton}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default NominatedBox;
