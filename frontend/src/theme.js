import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5b5bd6",
    },
    secondary: {
      main: "#00bfa6",
    },
    background: {
      default: "#f6f7fb",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(","),
    h5: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: { root: { boxShadow: "0 8px 30px rgba(0,0,0,0.06)" } },
    },
  },
});

export default theme;
