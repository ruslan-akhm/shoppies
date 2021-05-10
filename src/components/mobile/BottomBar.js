import { useContext, useRef, useEffect } from "react";
import CameraRollIcon from "@material-ui/icons/CameraRoll";
import { MovieStateContext } from "../../context/MovieContext";
import { UserContext } from "../../context/UserContext";

import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  bottomBar: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "fit-content",
    backgroundColor: theme.palette.solidGray.main,
    zIndex: "10",
  },
  icon: {
    fill: theme.palette.lightGray.main,
  },
  iconActive: {
    fill: "#fff",
  },
}));

function BottomBar(props) {
  const classes = useStyles();

  const { inView, setInView, badgeShown, setBadgeShown } = useContext(
    UserContext
  );
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
        icon={
          <SearchIcon
            className={
              inView === "MoviesBox" ? classes.iconActive : classes.icon
            }
          />
        }
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
            <CameraRollIcon
              className={
                inView === "NominatedBox" ? classes.iconActive : classes.icon
              }
            />
          </Badge>
        }
        style={{ minWidth: "50%", maxWidth: "50%", width: "50%" }}
        onClick={() => {
          setInView("NominatedBox");
        }}
      />
    </BottomNavigation>
  );
}

export default BottomBar;
