import { createTypes } from 'redux-compose-reducer';

export const AVAILABLE_MAP_SCENES = {
  preorder: 'PREORDER',
  activeOrder: 'ACTIVE_ORDER'
}

const TYPES = createTypes('ui/navigation', [
  'changeMapScene'
]);

export const changeToPreorderScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.preorder));
}

export const changeToActiveOrderScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.activeOrder));
}

const changeMapScene = (value) => (dispatch) => {
  dispatch({ type: TYPES.changeMapScene, data: value });
};
