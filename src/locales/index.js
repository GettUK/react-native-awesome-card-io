import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

import en from './en.json';

I18n.fallbacks = true;

I18n.translations = {
  en
};

const currentLocale = I18n.currentLocale();

export const isRTL =
  currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

ReactNative.I18nManager.allowRTL(isRTL);

export const strings = (name, params = {}) => I18n.t(name, params);

export default I18n;
