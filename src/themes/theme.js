import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 16,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: { main: "#1975e6" }, //#0346F2
    secondary: { main: "#e63819" },
    background: { main: "#474241" }, //"#F6F7FB"
    lightGray: { main: "#a39b99" }, //
    gray: { main: "#666262" },
    solidGray: { main: "#242323" },
    green: { main: "#00D555" },
    orange: { main: "#e69e22" },
    red: { main: "#e63819" },
  },
});
