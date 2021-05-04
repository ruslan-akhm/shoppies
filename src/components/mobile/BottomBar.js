import React, { useState, useContext, useRef, useEffect } from "react";
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CameraRollIcon from "@material-ui/icons/CameraRoll";
import { MovieStateContext } from "../../context/MovieContext";
import { UserContext } from "../../context/UserContext";

const useStyles = makeStyles(theme => ({
  bottomBar: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "fit-content",
    backgroundColor: theme.palette.solidGray.main,
  },
  icon: {
    fill: "#fff",
  },
}));

function BottomBar(props) {
  const classes = useStyles();
  const [badgeShown, setBadgeShown] = useState(false);
  const { setInView } = useContext(UserContext);
  const { nominated } = useContext(MovieStateContext);
  const nominatedRef = useRef(nominated.length);

  useEffect(() => {
    //watching if new nominees added (comparing with prev. number of nominees) and setting up badge if so
    if (nominatedRef.current < nominated.length) {
      setBadgeShown(true);
    }
    nominatedRef.current = nominated.length;
  }, [nominated]);

  return (
    <BottomNavigation className={classes.bottomBar}>
      <BottomNavigationAction
        className={classes.action}
        label="Search"
        value="search"
        icon={<SearchIcon className={classes.icon} />}
        style={{ minWidth: "50%", maxWidth: "50%", width: "50%" }}
        onClick={() => {
          setInView("MoviesBox");
        }}
      />
      <BottomNavigationAction
        className={classes.action}
        label="Nominees"
        value="nominees"
        icon={
          <Badge color="secondary" variant="dot" invisible={!badgeShown}>
            <CameraRollIcon className={classes.icon} />
          </Badge>
        }
        style={{ minWidth: "50%", maxWidth: "50%", width: "50%" }}
        onClick={() => {
          setInView("NominatedBox");
          setBadgeShown(false);
        }}
      />
    </BottomNavigation>
  );
}

export default BottomBar;
