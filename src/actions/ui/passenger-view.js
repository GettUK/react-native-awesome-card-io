import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('ui/passengerView', [
  'passegerViewEmpty',
  'receivePassegerViewStart',
  'receivePassegerViewFailure',
  'receivePassegerViewSuccess'
]);

export const passegerViewEmpty = () => ({ type: TYPES.passegerViewEmpty });

export const receivePassegerViewStart = () => ({ type: TYPES.receivePassegerViewStart });

export const receivePassegerViewFailure = errors => ({ type: TYPES.receivePassegerViewFailure, payload: errors });

export const receivePassegerViewSuccess = results => ({ type: TYPES.receivePassegerViewSuccess, payload: results });

export const receivePassegerView = id => (dispatch, getState) => {
  const { ui } = getState();

  if (ui.passengerView.busy) {
    return Promise.resolve();
  }

  dispatch(receivePassegerViewStart());
  return get(`/passengers/${id}`)
    .then(({ data }) => {
      dispatch(receivePassegerViewSuccess(data));
    })
    .catch((errors) => {
      dispatch(receivePassegerViewFailure(errors));
    });
};
