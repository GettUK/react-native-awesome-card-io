import { get, put, post } from 'utils';

const registerCompany = company => post('/company/create_signup_request', { company });

const forgotPassword = params => put('/user/forgot_password', params);

const login = user => post('/session', { user });

const getCurrentUser = () => get('/session');

export default {
  registerCompany,
  forgotPassword,
  login,
  getCurrentUser
};
