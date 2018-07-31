import { strings } from 'locales';

const presence = {
  allowEmpty: false
};

const emailRule = {
  presence,
  email: {
    message: strings('fieldValidation.common')
  }
};

export const loginRules = {
  email: emailRule,
  password: {
    presence,
    length: {
      minimum: 6,
      message: strings('fieldValidation.password.length')
    }
  }
};

export const resetPasswordRules = {
  email: emailRule
};

export const registerCompanyRules = {
  userName: {
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
