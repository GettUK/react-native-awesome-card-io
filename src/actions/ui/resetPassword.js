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

// eslint-disable-next-line import/prefer-default-export
export const resetPassword = query => (dispatch) => {
  dispatch(resetPasswordStart());

  return put('/user/forgot_password', query)
    .then(() => {
      dispatch(resetPasswordSuccess());
    });
};
