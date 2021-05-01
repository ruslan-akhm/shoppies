import React, { useState, useContext } from "react";
import { MovieDispatchContext } from "../../context/MovieContext";
import { GET_DATA } from "../../actions/Types";

import { Box, TextField, Button } from "@material-ui/core";
import axios from "axios";

const key = "7f58ee09"; //API key for OMDB

function SearchBar(props) {
  const [input, setInput] = useState();
  const dispatch = useContext(MovieDispatchContext);

  const handleSubmit = () => {
    //if input filed is empty - return
    if (!input || input.length === 0) return;

    const movie = input.replace(/\s/g, "-");
    const getMovies = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${movie}&apikey=${key}`
      );
      if (response.data.reponse === "False") {
        console.log("TRY OTHER MOVIE TITLE");
      }
      dispatch({ type: GET_DATA, payload: { movies: response.data.Search } });
      //if response.data.reponse === "False" - error message
    };
    getMovies();
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
