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
    onLinkPress: () => handlers.goToInfoPage('privacy')
  }
];

export const prepareInputsBlock = (data = {}, handlers = {}) => [
  {
    label: strings('auth.label.yourName'),
    value: data.firstName || '',
    onChangeText: v => handlers.handleChangeField('firstName', v),
    autoCorrect: false,
    error: data.errors && data.errors.firstName
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
    value: data.lastName || '',
    onChangeText: v => handlers.handleChangeField('lastName', v),
    autoCorrect: false,
    multiline: true,
    error: data.errors && data.errors.lastName
  }
];
