import { merge, isEmpty } from 'lodash/fp';
import {
  CHANGE_ISOPENKEYBOARD,
  CHANGE_PERMISSIONS
} from 'actions/app/statuses';

export const initialState = {
  isOpenKeyboard: false
};

export const reducer = (state, action) => {
  switch (action.type) {
  case CHANGE_ISOPENKEYBOARD: {
    return {
      ...state,
      isOpenKeyboard: action.payload
    };
  }

  case CHANGE_PERMISSIONS: {
    return {
      ...state,
      permissions: isEmpty(state.permissions) ?
        action.payload :
        merge(state.permissions, action.payload)
    };
  }

  default: {
    return state;
  }
  }
};
