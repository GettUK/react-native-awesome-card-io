import Color from './Color';

export const color = {
  primaryText: '#000000',
  secondaryText: '#8e8e93',
  arrowRight: '#bbbbbf',
  pixelLine: '#D8D8D8',
  bgPrimary: '#ffffff',
  bgSecondary: '#ffffff',
  bgSettings: '#efeff4',
  bgSearch: '#f2f2f2',
  white: '#ffffff',
  header: '#284784',
  primaryBtns: '#284784',
  animationRout: '#8c9bbb',
  iconsSettigs: '#0076BB',
  bgStatuses: '#00a0ff',
  ordersTabs: '#7ae4ff',
  disabledLink: '#bcc9e3',
  info: '#0076BB',
  infoLight: '#D2EBFD',
  success: '#00c46b',
  successLight: '#D4F2E2',
  warning: '#fcb625',
  warningLight: '#fffaeb',
  danger: '#ff0000',
  dangerLight: '#fef0ef',
  backdrop: '#284784'
};

export const formattedColor = {
  primaryText: new Color(color.primaryText),
  secondaryText: new Color(color.secondaryText),
  white: new Color(color.white),
  primaryBtns: new Color(color.primaryBtns),
  animationRout: new Color(color.animationRout),
  bgStatuses: new Color(color.bgStatuses),
  bgSettings: new Color(color.bgSettings)
};

export default {
  color,
  formattedColor
};
