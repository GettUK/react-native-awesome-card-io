import findKey from 'lodash/findKey';

const active = ['arrived', 'creating', 'in_progress', 'locating', 'on_the_way', 'order_received'];
const cancelled = ['rejected', 'customer_care', 'cancelled', 'processing'];
const completed = ['completed', 'billed'];

export function getOrdersStatuses(type) {
  const statuses = {
    // eslint-disable-next-line max-len
    active: ['creating', 'locating', 'on_the_way', 'arrived', 'in_progress', 'order_received', 'customer_care', 'processing'],
    previous: ['completed', 'cancelled', 'rejected', 'billed']
  };
  return statuses[type];
}

export function getLabelColor(status) {
  const colors = { blue: active, red: cancelled, green: completed };

  return findKey(colors, s => s.includes(status));
}

export function getLabelType(status) {
  const types = { info: active, danger: cancelled, success: completed };

  return findKey(types, s => s.includes(status));
}

export function goBackFromSettings(navigation) {
  return () => {
    navigation.state.params.onBack({ fromSettings: navigation.state.params.fromSettings });

    navigation.goBack(null);
  };
}
