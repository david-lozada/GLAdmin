import UbuntuCondensedTtf from './fonts/Ubuntu_Condensed/UbuntuCondensed-Regular.ttf';
import FjallaOneTtf from './fonts/Fjalla_One/FjallaOne-Regular.ttf';

const ubuntuCondensed = {
  fontFamily: 'Ubuntu Condensed',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Ubuntu Condensed'),
    local('UbuntuCondensed-Regular'),
    url(${UbuntuCondensedTtf}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const fjallaOne = {
  fontFamily: 'Fjalla One',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Fjalla One'),
    local('FjallaOne-Regular'),
    url(${FjallaOneTtf}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};