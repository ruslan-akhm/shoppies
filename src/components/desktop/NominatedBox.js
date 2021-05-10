import { useContext, useEffect } from "react";
import { MovieStateContext } from "../../context/MovieContext";

import { makeStyles, Grid, Typography } from "@material-ui/core";
import MovieCard from "../MovieCard";
import { UserContext } from "../../context/UserContext";

const useStyles = makeStyles(theme => ({
  boxTitle: {
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(3),
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
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}));

function NominatedBox(props) {
  const classes = useStyles();
  const { nominated } = useContext(MovieStateContext);
  const { setBadgeShown } = useContext(UserContext);

  useEffect(() => {
    setBadgeShown(false);
  }, []);

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
        <Grid item container direction="row" justify="center" lg={12}>
          {nominated.map((movie, index) => {
            return (
              <MovieCard
                movie={movie}
                index={index}
                key={movie.imdbID}
                caller="NominatedBox"
              />
            );
          })}
        </Grid>
      ) : (
        <Typography className={classes.message}>
          You haven't nominated any movies yet...
        </Typography>
      )}
    </Grid>
  );
}

export default NominatedBox;
