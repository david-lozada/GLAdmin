import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Ubuntu Condensed, sans-serif',
  },
  palette: {
  	primary: {
      light: '#bfcbd0',
      main: '#b0bec5',
      dark: '#7b8589',
    },
    secondary: {
      light: '#33eaff',
      main: '#00e5ff',
      dark: '#00a0b2',
    },
  },
});

export default theme