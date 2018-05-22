import { reducer } from 'react-native-offline';

const initialState = {
  isConnected: true,
  actionQueue: []
};

const reducerNetwork = (state = initialState, action) =>
  reducer(state, action);

export default reducerNetwork;
