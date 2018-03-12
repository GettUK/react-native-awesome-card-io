import { createTypes } from 'redux-compose-reducer';
import { put } from 'utils';

const TYPES = createTypes('resetPassword', [
  'start',
  'succeed'
]);

const resetPasswordStart = () => ({
  type: TYPES.start
});

const resetPasswordSuccess = () => ({
  type: TYPES.succeed
});

export const resetPassword = query => dispatch => {
  dispatch(resetPasswordStart());

  return put('/user/forgot_password', query)
    .then(() => {
      dispatch(resetPasswordSuccess());
    });
};
