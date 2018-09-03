import Color from './Color';

export const color = {
  primaryText: '#ffffff',
  secondaryText: 'rgba(255,255,255,0.6)',
  arrowRight: '#bbbbbf',
  pixelLine: 'rgba(255,255,255,0.13)',
  bgPrimary: '#202634',
  bgSecondary: '#313b4d',
  bgSettings: '#2c3343',
  bgSearch: '#313b4d',
  bgOptions: 'rgba(255,255,255,0.8)',
  white: '#ffffff',
  primaryBtns: '#ffffff',
  animationRout: '#8c9bbb',
  iconsSettigs: '#0076BB',
  bgStatuses: '#00a0ff',
  ordersTabs: '#0076BB',
  disabledLink: 'rgba(255,255,255,0.6)',
  info: '#00a0ff',
  infoLight: '#223E5A',
  success: '#00c46b',
  successLight: 'rgba(0,196,107,0.2)',
  warning: '#fcb625',
  warningLight: '#fffaeb',
  danger: '#ff6884',
  dangerLight: 'rgba(255,0,0,0.2)',
  backdrop: 'rgba(49,59,77,0.7)'
};

export const formattedColor = {};
Object.keys(color).forEach((key) => {
  formattedColor[key] = new Color(color[key]);
});

export default {
  color,
  formattedColor
};
