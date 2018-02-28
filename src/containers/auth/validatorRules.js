import { strings } from 'locales';  

const emailRule = {
  presence: {
    allowEmpty: false
  },
  email: {
    message: strings('validation.email.format')
  }
}

export const loginRules = {
  email: emailRule,
  password: {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 6,
      message: strings('validation.password.length')
    }
  }
};

export const resetPasswordRules = {
  email: emailRule
}
