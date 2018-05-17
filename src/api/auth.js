import { get, put, post } from 'utils';

const forgotPassword = params => put('/user/forgot_password', params);

const login = user => post('/session', { user });

const getCurrentUser = () => get('/session');

export default {
  forgotPassword,
  login,
  getCurrentUser
};
