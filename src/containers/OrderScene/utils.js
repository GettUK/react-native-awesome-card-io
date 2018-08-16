import { Linking } from 'react-native';
import { strings } from 'locales';
import { PROCESSING_STATUS } from 'utils/orderStatuses';

export const onMyWayOptions = (handlers = {}) => [
  {
    chevronHide: true,
    label: 'in 2 minutes',
    onPress: () => handlers.notifyDriver(2)
  },
  {
    chevronHide: true,
    label: 'in 5 minutes',
    onPress: () => handlers.notifyDriver(5)
  },
  {
    chevronHide: true,
    label: 'in 10 minutes',
    onPress: () => handlers.notifyDriver(10)
  }
];

export const actionsOptions = (data = {}) => [{
  icon: 'contactUs',
  label: strings('information.contactUs'),
  onPress: () => Linking.openURL(`tel:${data.customerServicePhone}`)
}];

export const shouldCallDispatcher = order => order.status === PROCESSING_STATUS && order.vendorNumber;
