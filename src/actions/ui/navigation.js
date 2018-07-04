import { createTypes } from 'redux-compose-reducer';

export const AVAILABLE_MAP_SCENES = {
  orderCreating: 'ORDER_CREATING',
  activeOrder: 'ACTIVE_ORDER',
  completedOrder: 'COMPLETED_ORDER'
};

const TYPES = createTypes('ui/navigation', [
  'changeMapScene'
]);

const changeMapScene = value => (dispatch) => {
  dispatch({ type: TYPES.changeMapScene, data: value });
};

export const goToOrderCreatingScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.orderCreating));
};

export const goToActiveOrderScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.activeOrder));
};

export const goToCompletedOrderScene = () => (dispatch) => {
  dispatch(changeMapScene(AVAILABLE_MAP_SCENES.completedOrder));
};
