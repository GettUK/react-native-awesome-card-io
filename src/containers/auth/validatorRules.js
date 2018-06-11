import { strings } from 'locales';

const presence = {
  allowEmpty: false
};

const emailRule = {
  presence,
  email: {
    message: strings('validation.email.format')
  }
};

export const loginRules = {
  email: emailRule,
  password: {
    presence,
    length: {
      minimum: 6,
      message: strings('validation.password.length')
    }
  }
};

export const resetPasswordRules = {
  email: emailRule
};

export const registerCompanyRules = {
  firstName: {
    presence
  },
  phoneNumber: {
    presence
  },
  email: emailRule,
  name: {
    presence
  }
};
