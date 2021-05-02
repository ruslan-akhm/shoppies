import { useContext } from "react";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { getData } from "../../actions/Movies";

import {
  makeStyles,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  inputField: {
    width: "100%",
  },
  messageBox: {
    minHeight: "5vh",
    border: "1px solid green",
  },
  searchBox: {
    border: "1px solid black",
    marginBottom: "5vh",
  },
}));

function SearchBar() {
  const classes = useStyles();
  const dispatch = useContext(MovieDispatchContext);
  const { error, searchQuery } = useContext(MovieStateContext);

  const search = e => {
    e.preventDefault();
    // //replace spaces with dashes in order to get correct results
    // const movie = e.target.value.replace(/\s/g, "-");
    getData(dispatch, { searchQuery: e.target.value });
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
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box className={classes.messageBox}>
        {error && searchQuery.length !== 0 ? (
          <Typography>Try narrowing down the search</Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default SearchBar;
