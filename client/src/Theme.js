import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    black: {
      main: "#000000",
      light: "#323232",
      dark: "#3c3c3c",
      contrastText: '#ffffff',
      text: "#000000",
    },
    white: {
      main: "#ffffff",
      contrastText: "#000000",
      text: "#ffffff",
    },
    primary: {
      main: "#006ED4",
      contrastText: "#000000",
      text: "#ffffff",
    },
    chip: {
      main: "#006ED4",
      contrastText: "#ffffff",
      text: "#ffffff",
    },
    blue: {
      main: "#006ED4",
      contrastText: "#000000",
      text: "#ffffff",
    }
  },
});

export default theme;