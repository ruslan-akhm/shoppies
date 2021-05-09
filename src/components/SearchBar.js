import { useContext, useState } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../context/MovieContext";
import { getData } from "../actions/Movies";
import { LOAD_DATA } from "../actions/Types";
import { UserContext } from "../context/UserContext";

import { makeStyles, Grid, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import logo from "../img/logo.png";

const useStyles = makeStyles(theme => ({
  icon: {
    fill: "#fff",
  },
  inputField: {
    width: "100%",
    color: "#fff",
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.lightGray.main,
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.gray.main,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0.5),
      borderRadius: "0",
      height: theme.spacing(6),
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.solidGray.main,
      },
    },
  },
  logo: {
    width: "auto",
    margin: "auto",
    height: theme.spacing(6),
    marginTop: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  searchBox: {
    boxSizing: "border-box",
    width: "100%",
  },
}));

function SearchBar() {
  const classes = useStyles();
  const dispatch = useContext(MovieDispatchContext);
  const { loading } = useContext(MovieStateContext);
  const { inputFocused, setInputFocused, setShowMovies } = useContext(
    UserContext
  );

  const search = e => {
    e.preventDefault();
    //show movies box if user typed at least 1 symbol
    setShowMovies(() => {
      return e.target.value.length > 0 ? true : false;
    });
    //show loading if user is still typing
    if (!loading) {
      dispatch({ type: LOAD_DATA });
    }

    //setting up timer to prevent too many unnecessary lookups while user is still typing
    clearTimeout(window.inputTimer);
    window.inputTimer = setTimeout(() => {
      return getData(dispatch, { searchQuery: e.target.value });
    }, 220);
  };

  const focus = e => {
    setInputFocused(true);
    setShowMovies(() => {
      return e.target.value.length > 0 ? true : false;
    });
  };

  return (
    <Grid
      container
      className={classes.searchBox}
      direction="row"
      justify="center"
    >
      <Grid
        item
        container
        md={2}
        sm={3}
        xs={3}
        justify="center"
        alignItems="center"
      >
        <img src={logo} alt="logo" className={classes.logo} />
      </Grid>
      <Grid item md={10} sm={9} xs={9}>
        <TextField
          placeholder="Movie..."
          variant="outlined"
          onChange={e => search(e)}
          onFocus={e => focus(e)}
          onBlur={() => {
            setInputFocused(false);
            //setShowMovies(false);
          }}
          className={classes.inputField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={classes.icon} />
              </InputAdornment>
            ),
            className: classes.inputField,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default SearchBar;
