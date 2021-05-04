import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import SearchBar from "../SearchBar";
import MoviesBox from "../desktop/MoviesBox";
import NominatedBox from "../desktop/NominatedBox";
import { UserContext } from "../../context/UserContext";

function MobileBox(props) {
  const { inView } = useContext(UserContext);

  return (
    <Box>
      {inView === "MoviesBox" ? (
        <>
          <SearchBar />
          <MoviesBox />
        </>
      ) : (
        <>
          <NominatedBox />
        </>
      )}
    </Box>
  );
}

export default MobileBox;
