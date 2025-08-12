import { createTheme } from "@mui/material/styles";
import { theme as paletteTheme } from "./components/palette";

const theme = createTheme({
  ...paletteTheme, 
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: '700',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
