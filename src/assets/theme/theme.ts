import { createTheme } from "@mui/material";
import { palette } from "./components/palette";

const theme = createTheme({
    palette,
    typography: {
        fontFamily: 'Roboto, Arial, sans-sarif',
        h1:{
            fontSize: '2rem',
            fontWeight: '700,'
        },
        body1: {
            fontSize: '1rem',
        },
    },
});
export default theme;