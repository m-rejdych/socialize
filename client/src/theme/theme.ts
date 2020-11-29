import { createMuiTheme } from '@material-ui/core';
import { teal, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

export default theme;
