import { useContext } from "react";
import { MovieDispatchContext } from "../../context/MovieContext";
import { getData } from "../../actions/Movies";

import { Box, TextField } from "@material-ui/core";

function SearchBar() {
  const dispatch = useContext(MovieDispatchContext);

  const search = e => {
    e.preventDefault();
    //replace spaces with dashes in order to get correct results
    const movie = e.target.value.replace(/\s/g, "-");
    getData(dispatch, { searchQuery: movie });
  };

  return (
    <Box style={{ border: "1px solid black" }}>
      <TextField label="Movie" variant="outlined" onChange={e => search(e)} />
    </Box>
  );
}

export default SearchBar;
