import Color from './Color';

export const color = {
  primaryText: '#000000',
  secondaryText: '#8e8e93',
  arrowRight: '#bbbbbf',
  pixelLine: '#D8D8D8',
  bgSettings: '#efeff4',
  bgSearch: '#f2f2f2',
  white: '#ffffff',
  primaryBtns: '#284784',
  animationRout: '#8c9bbb',
  iconsSettigs: '#0076BB',
  bgStatuses: '#00a0ff',
  ordersTabs: '#7ae4ff',
  disabledLink: '#bcc9e3',
  infoLight: '#ecf6fd',
  success: '#00c46b',
  successLight: '#ebf8f2',
  warning: '#fcb625',
  warningLight: '#fffaeb',
  danger: '#ff0000',
  dangerLight: '#fef0ef'
};

export const formattedColor = {
  primaryText: new Color(color.primaryText),
  secondaryText: new Color(color.secondaryText),
  white: new Color(color.white),
  primaryBtns: new Color(color.primaryBtns),
  animationRout: new Color(color.animationRout),
  bgStatuses: new Color(color.bgStatuses)
};
