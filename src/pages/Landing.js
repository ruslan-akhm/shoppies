import SearchBar from "../components/SearchBar";
import MoviesBox from "../components/desktop/MoviesBox";
import NominatedBox from "../components/desktop/NominatedBox";
import BottomBar from "../components/mobile/BottomBar";
import MobileBox from "../components/mobile/MobileBox";

import { makeStyles, Grid, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  landing: {
    minHeight: "100vh",
    padding: "5vh",
    paddingBottom: "10vh",
    backgroundColor: theme.palette.background.main,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "15vh",
    },
  },
}));

function Landing(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.landing}>
      <Hidden smDown>
        <Grid item>
          <SearchBar />
        </Grid>
        <Grid item container direction="row" justify="center">
          <Grid item lg={6} md={6}>
            <MoviesBox />
          </Grid>
          <Grid item lg={6} md={6}>
            <NominatedBox />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <MobileBox />
        <BottomBar />
      </Hidden>
    </Grid>
  );
}

export default Landing;
