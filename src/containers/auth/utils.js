import { strings } from 'locales';

export const prepareSwitchesBlock = (data = {}, handlers = {}) => [
  {
    label: strings('login.accept'),
    link: strings('login.termsConditions'),
    value: data.acceptTac || false,
    onValueChange: v => handlers.handleChangeField('acceptTac', v),
    onLinkPress: () => handlers.goToInfoPage('terms')
  },
  {
    label: strings('login.accept'),
    link: strings('login.privacyPolicy'),
    value: data.acceptPp || false,
    onValueChange: v => handlers.handleChangeField('acceptPp', v),
    onLinkPress: () => handlers.goToInfoPage('privacy')
  }
];

export const prepareInputsBlock = (data = {}, handlers = {}) => [
  {
    label: strings('login.registerForm.yourName'),
    value: data.firstName || '',
    onChangeText: v => handlers.handleChangeField('firstName', v),
    autoCorrect: false,
    error: data.errors && data.errors.firstName
  },
  {
    label: strings('login.registerForm.phoneNumber'),
    value: data.phoneNumber || '',
    onChangeText: v => handlers.handleChangeField('phoneNumber', v),
    autoCorrect: false,
    keyboardType: 'numeric',
    error: data.errors && data.errors.phoneNumber
  },
  {
    label: strings('login.registerForm.email'),
    value: data.email || '',
    onChangeText: v => handlers.handleChangeField('email', v),
    autoCorrect: false,
    keyboardType: 'email-address',
    error: data.errors && data.errors.email
  },
  {
    label: strings('login.registerForm.companyName'),
    value: data.name || '',
    onChangeText: v => handlers.handleChangeField('name', v),
    autoCorrect: false,
    error: data.errors && data.errors.name
  },
  {
    label: strings('login.registerForm.comments'),
    value: data.lastName || '',
    onChangeText: v => handlers.handleChangeField('lastName', v),
    autoCorrect: false,
    multiline: true,
    error: data.errors && data.errors.lastName
  }
];
