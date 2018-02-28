import { composeReducer } from 'redux-compose-reducer';

import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';

const initialState = {
  activeScene: AVAILABLE_MAP_SCENES.preorder
};

const changeMapScene = (state, { data }) => {
  return { ...state, activeScene: data };
}

export default composeReducer(
  'ui/navigation',
  {
    changeMapScene
  },
  initialState
);
