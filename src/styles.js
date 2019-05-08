// colors
const Black = {
  Black: '#000000',
  Light: '#333333',
};

const White = {
  Default: '#FFFFFF',
};

const Neutrals = {
  Dark: '#172B4D',
  DarkNeutrals: '#344563',
  DarkLight: '#42526E',
  MidDark: '#505F79',
  Mid: '#6B778C',
  MidLight: '#8993A4',
  LightDark: '#C1C7D0',
  LightMid: '#EBECF0',
  Light: '#FAFBFC',
};

const Blue = {
  Dark: '#172B4D',
  Default: '#0052CC',
  Light: '#0065FF',
  Faded: '#2684FF',
};

const Red = {
  Dark: '#BF2600',
  Default: '#DE350B',
  Light: '#FF5630',
  Faded: '#FF8F73',
};

const Orange = {
  Dark: '#FF8B00',
  Default: '#FFAB00',
  Light: '#FFC400',
  Faded: '#FFF0B3',
};

const Green = {
  Dark: '#006644',
  Default: '#00875A',
  Light: '#36B37E',
  Faded: '#ABF5D1',
};

const ColorsPalette = {
  Brand: Blue.Default,
  Text: Black.Light,
  TextInvers: White.Default,
  TextFaded: Neutrals.DarkLight,
  White: '#ffffff',
  Background: '#0747a6',
};

export const Colors = {
  ColorsPalette,
  Black,
  Blue,
  Red,
  Orange,
  Green,
  Neutrals,
};

// media sizes
export const MediaSize = {
  Phone: '380px',
  Tablet: '540px',
  Notebook: '860px',
  Desktop: '1180px',
  Fullscreen: '1500px',
};

export const Sizes = {
  Header: {
    height: '56px',
    number: 56,
  },
  TopBar: {
    height: '44px',
    number: 44,
  },
  LeftBar: {
    width: {
      Tablet: '45vw',
      Notebook: '35vw',
      Desktop: '30vw',
      Fullscreen: '20vw',
    },
  },
};

// global theme styles
export const Theme = {
  global: {
    colors: {
      brand: Colors.ColorsPalette.Brand,
      background: '#F7F8F9',
      // background: Colors.ColorsPalette.White,
      // background: 'rgba(0, 82, 204, .05)',
      focus: 'rgba(0, 0, 0, 0.33)',
      'neutral-1': Colors.Neutrals.DarkNeutrals,
      'neutral-2': Colors.Neutrals.MidDark,
      'neutral-3': Colors.Neutrals.LightDark,
      'accent-1': Colors.Blue.Light,
      'accent-2': Colors.Black.Default,
      'status-critical': Colors.Red.Dark,
      'status-warning': Colors.Red.Default,
      'status-ok': Colors.Green.Default,
      'status-unknown': Colors.Neutrals.Mid,
      'status-disabled': Colors.Neutrals.Mid,
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
  checkBox: {
    gap: 'xsmall',
    size: '18px',
  },
};
