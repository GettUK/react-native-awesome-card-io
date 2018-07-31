import { strings } from 'locales';

export const prepareSwitchesBlock = (data = {}, handlers = {}) => [
  {
    label: strings('auth.label.accept'),
    link: strings('information.termsConditions'),
    value: data.acceptTac || false,
    onValueChange: v => handlers.handleChangeField('acceptTac', v),
    onLinkPress: () => handlers.goToInfoPage('termsConditions')
  },
  {
    label: strings('auth.label.accept'),
    link: strings('information.privacyPolicy'),
    value: data.acceptPp || false,
    onValueChange: v => handlers.handleChangeField('acceptPp', v),
    onLinkPress: () => handlers.goToInfoPage('privacyPolicy')
  }
];

export const prepareInputsBlock = (data = {}, handlers = {}) => [
  {
    label: strings('auth.label.yourName'),
    value: data.userName || '',
    onChangeText: v => handlers.handleChangeField('userName', v),
    autoCorrect: false,
    error: data.errors && data.errors.userName
  },
  {
    label: strings('auth.label.phoneNumber'),
    value: data.phoneNumber || '',
    onChangeText: v => handlers.handleChangeField('phoneNumber', v),
    autoCorrect: false,
    keyboardType: 'numeric',
    error: data.errors && data.errors.phoneNumber
  },
  {
    label: strings('auth.label.workEmail'),
    value: data.email || '',
    onChangeText: v => handlers.handleChangeField('email', v),
    autoCorrect: false,
    keyboardType: 'email-address',
    error: data.errors && data.errors.email
  },
  {
    label: strings('auth.label.company'),
    value: data.name || '',
    onChangeText: v => handlers.handleChangeField('name', v),
    autoCorrect: false,
    error: data.errors && data.errors.name
  },
  {
    label: strings('auth.label.comments'),
    value: data.comment || '',
    onChangeText: v => handlers.handleChangeField('comment', v),
    autoCorrect: false,
    multiline: true,
    error: data.errors && data.errors.comment
  }
];
