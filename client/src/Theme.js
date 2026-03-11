import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  html: {
    height: '100%'
  },
  typography: {
    fontFamily: 'Ubuntu Condensed, sans-serif',
  },
  palette: {
  	primary: {
      light: '#bfcbd0',
      main: '#7b8589',
      dark: '#2b2727',
    },
    secondary: {
      light: '#33eaff',
      main: '#00e5ff',
      dark: '#00a0b2',
    },
  },
  fjallaOne: {
    fontFamily: 'Fjalla One, sans-serif',
  },
});

export default theme