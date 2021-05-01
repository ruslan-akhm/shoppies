import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import axios from "axios";

function SearchBar(props) {
  const [input, setInput] = useState();
  const key = "7f58ee09";

  const handleSubmit = () => {
    const movie = input.replace(/\s/g, "-");
    const getMovies = async () => {
      const response = await axios.post(
        `http://www.omdbapi.com/?s=${movie}&apikey=${key}`
      );
      //if response.data.reponse === "False" - error message
    };
    getMovies();
  };

  return (
    <Box>
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
