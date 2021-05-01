import { useReducer } from "react";

import {
  MovieStateContext,
  MovieDispatchContext,
} from "./context/MovieContext";
import { initialState, MovieReducer } from "./reducers/MovieReducer";

import Landing from "./pages/landing/Landing";

import { Box } from "@material-ui/core";

function App() {
  const [state, dispatch] = useReducer(MovieReducer, initialState);
  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatch}>
        <Box>
          <Landing />
        </Box>
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
}

export default App;
