import { useContext } from "react";
import {
  //MovieStateContext,
  MovieDispatchContext,
} from "../../context/MovieContext";
import { getData } from "../../actions/Movies";

import {
  makeStyles,
  Box,
  TextField,
  InputAdornment,
  //Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
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
  //const { error, searchQuery } = useContext(MovieStateContext);

  const search = e => {
    e.preventDefault();
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
              <SearchIcon style={{ fill: "#fff" }} />
            </InputAdornment>
          ),
          className: classes.inputField,
        }}
      />
    </Box>
  );
}

export default SearchBar;
