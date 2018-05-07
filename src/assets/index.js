/* eslint-disable global-require */
const imagesApp = {
  carTypes: {
    OTBlackTaxi: require('./png/application/OTBlackTaxi.png'),
    BlackTaxi: require('./png/application/BlackTaxi.png'),
    Standard: require('./png/application/Standard.png'),
    BlackTaxiXL: require('./png/application/BlackTaxiXL.png'),
    Exec: require('./png/application/Exec.png'),
    MPV: require('./png/application/MPV.png'),
    Porsche: require('./png/application/Porsche.png'),
    Special: require('./png/application/Special.png')
  },
  expirationDate: require('./png/application/expirationDate.png'),
  cvv: require('./png/application/cvv.png'),
  clear: require('./png/application/clear-icon.png'),
  loginBg: require('./png/application/login-bg.jpg'),
  orderMap: require('./png/application/orderTempMap.jpg'),
  pointerShadow: require('./png/circle_shadow.png'),
  carShadow: require('./png/car_shadow.png')
};
/* eslint-enable global-require */

export default imagesApp;
