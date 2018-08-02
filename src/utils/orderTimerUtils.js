import { AsyncStorage } from 'react-native';

const orderKey = '@currentOrder';

export const setCurrentOrder = (orderID, data) => AsyncStorage.setItem(`${orderKey}${orderID}`, JSON.stringify(data));

export const getCurrentOrder = orderID => AsyncStorage.getItem(`${orderKey}${orderID}`).then(data => JSON.parse(data));

export const deleteCurrentOrder = orderID => AsyncStorage.removeItem(`${orderKey}${orderID}`);
