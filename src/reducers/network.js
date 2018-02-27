import { reducer } from 'react-native-offline';

const initialState = {
  isConnected: false,
  actionQueue: []
};

const reducerNetwork = (state = initialState, action) =>
  reducer(state, action);

export default reducerNetwork;
