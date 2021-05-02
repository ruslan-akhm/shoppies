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
    primary: { main: "#0346F2" },
    secondary: { main: "#EBEBF9" },
    background: { main: "#F6F7FB" },
    lightGray: { main: "#E7E9F0" },
    solidGray: { main: "#8E94A7" },
    green: { main: "#00D555" },
  },
});
