import { useContext } from "react";
import { MovieStateContext } from "../../context/MovieContext";

import { makeStyles, Grid, Typography } from "@material-ui/core";
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
  message: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.lightGray.main,
    marginTop: theme.spacing(2),
  },
  nominatedBox: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}));

function NominatedBox(props) {
  const classes = useStyles();
  const { nominated } = useContext(MovieStateContext);
  let x = JSON.parse(localStorage.getItem("nominatedMovies")); //localStorage.getItem("nominatedMovies");
  console.log(x);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.nominatedBox}
    >
      <Typography className={classes.boxTitle}>Nominees</Typography>
      {nominated.length > 0 ? (
        nominated.map((movie, index) => {
          return (
            <MovieCard
              movie={movie}
              index={index}
              key={movie.imdbID}
              caller="NominatedBox"
            />
          );
        })
      ) : (
        <Typography className={classes.message}>
          You haven't nominated any movies yet...
        </Typography>
      )}
    </Grid>
  );
}

export default NominatedBox;
