import { createTypes } from 'redux-compose-reducer';

export const AVAILABLE_MAP_SCENES = {
  preorder: 'PREORDER',
  activeOrder: 'ACTIVE_ORDER'
};

const TYPES = createTypes('ui/navigation', [
  'changeMapScene'
]);

const changeMapScene = value => dispatch => {
  dispatch({ type: TYPES.changeMapScene, data: value });
};

export const goToPreorderScene = () => dispatch => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.preorder));
};

export const goToActiveOrderScene = () => dispatch => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.activeOrder));
};
