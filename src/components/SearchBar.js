import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../context/MovieContext";
import { getData } from "../actions/Movies";
import { LOAD_DATA } from "../actions/Types";

import { makeStyles, Box, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

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
  },
  searchBox: {
    marginBottom: "5vh",
  },
}));

function SearchBar() {
  const classes = useStyles();
  const dispatch = useContext(MovieDispatchContext);
  const { loading } = useContext(MovieStateContext);

  const search = e => {
    e.preventDefault();
    //show loading if user still typing
    if (!loading) {
      dispatch({ type: LOAD_DATA });
    }
    //setting up timer to prevent unnecessary lookups while user is still typing
    clearTimeout(window.inputTimer);
    window.inputTimer = setTimeout(() => {
      return getData(dispatch, { searchQuery: e.target.value });
    }, 350);
  };

  return (
    <Box className={classes.searchBox}>
      <TextField
        placeholder="Movie..."
        variant="outlined"
        onChange={e => search(e)}
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
    </Box>
  );
}

export default SearchBar;
