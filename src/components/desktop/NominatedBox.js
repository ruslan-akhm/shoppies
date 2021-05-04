import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { removeNominee } from "../../actions/Movies";
//import defaultPoster from "../../img/defaultPoster.png";

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
  // cardInfo: {
  //   padding: theme.spacing(2),
  // },
  // cardTitle: {
  //   height: "fit-content",
  //   color: "#fff",
  // },
  message: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.lightGray.main,
    marginTop: theme.spacing(2),
  },
  // movieCard: {
  //   marginBottom: theme.spacing(3),
  //   border: `1px solid ${theme.palette.solidGray.main}`,
  // },
  nominatedBox: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  // poster: {
  //   width: "100%",
  //   height: "100%",
  //   maxHeight: "320px",
  //   minHeight: "180px",
  //   objectFit: "cover",
  // },
  // removeButton: {
  //   marginTop: "auto",
  // },
}));

function NominatedBox(props) {
  const classes = useStyles();
  const dispatch = useContext(MovieDispatchContext);
  const { nominated } = useContext(MovieStateContext);

  // const remove = e => {
  //   removeNominee(dispatch, { movie: e });
  // };
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
            // <Fade key={index} in={index >= 0}>
            //   <Grid
            //     item
            //     container
            //     className={classes.movieCard}
            //     direction="row"
            //     lg={12}
            //     md={12}
            //   >
            //     <Grid item lg={3} md={3}>
            //       <img
            //         className={classes.poster}
            //         src={movie.Poster == "N/A" ? defaultPoster : movie.Poster}
            //       />
            //     </Grid>
            //     <Grid
            //       item
            //       container
            //       direction="column"
            //       lg={9}
            //       md={9}
            //       className={classes.cardInfo}
            //     >
            //       <Typography className={classes.cardTitle} variant="h5">
            //         {movie.Title} ({movie.Year})
            //       </Typography>
            //       <Button
            //         variant="contained"
            //         color="secondary"
            //         onClick={e => remove(movie)}
            //         className={classes.removeButton}
            //       >
            //         Remove
            //       </Button>
            //     </Grid>
            //   </Grid>
            // </Fade>
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
