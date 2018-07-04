import { composeReducer } from 'redux-compose-reducer';

import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';

const initialState = {
  activeScene: AVAILABLE_MAP_SCENES.orderCreating
};

const changeMapScene = (state, { data }) => ({ ...state, activeScene: data });

export default composeReducer(
  'ui/navigation',
  {
    changeMapScene
  },
  initialState
);
