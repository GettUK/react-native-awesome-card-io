import { createTypes } from 'redux-compose-reducer';

export const AVAILABLE_MAP_SCENES = {
  preOrder: 'PREORDER',
  activeOrder: 'ACTIVE_ORDER',
  completedOrder: 'COMPLETED_ORDER'
};

const TYPES = createTypes('ui/navigation', [
  'changeMapScene'
]);

const changeMapScene = value => (dispatch) => {
  dispatch({ type: TYPES.changeMapScene, data: value });
};

export const goToPreOrderScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.preOrder));
};

export const goToActiveOrderScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.activeOrder));
};

export const goToCompletedOrderScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.completedOrder));
};
