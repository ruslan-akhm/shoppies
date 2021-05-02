import { useState, useContext } from "react";
import { MovieDispatchContext } from "../../context/MovieContext";
import { getData } from "../../actions/Movies";

import { Box, TextField, Button } from "@material-ui/core";

function SearchBar() {
  const [input, setInput] = useState();
  const dispatch = useContext(MovieDispatchContext);

  const handleSubmit = () => {
    //if input field is empty - return
    if (!input || input.length === 0) return;
    //replace spaces with dashes to make search return correct results
    const movie = input.replace(/\s/g, "-");
    getData(dispatch, movie);
  };

  return (
    <Box style={{ border: "1px solid black" }}>
      <TextField
        label="Movie"
        variant="outlined"
        onChange={e => setInput(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Search!
      </Button>
    </Box>
  );
}

export default SearchBar;
