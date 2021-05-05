import { useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

import UserProvider from "./context/UserContext";
import {
  MovieStateContext,
  MovieDispatchContext,
} from "./context/MovieContext";
import { initialState, MovieReducer } from "./reducers/MovieReducer";
import Landing from "./pages/Landing";

import { Box } from "@material-ui/core";

function App() {
  const [state, dispatch] = useReducer(MovieReducer, initialState);
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <MovieStateContext.Provider value={state}>
          <MovieDispatchContext.Provider value={dispatch}>
            <Box>
              <Landing />
            </Box>
          </MovieDispatchContext.Provider>
        </MovieStateContext.Provider>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
