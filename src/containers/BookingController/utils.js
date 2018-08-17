import { map, reduce } from 'lodash';
import { strings } from 'locales';

export const prepareAddress = (address, name, type) =>
  address && ({ address: { ...address, label: name }, name, type });

export const prepareFavAddresses = addresses => addresses && map(
  addresses,
  item => ({ ...item, address: { ...item.address, label: item.name } })
);

export const prepareDefaultValues = ({ favoriteAddresses, homeAddress, workAddress } = {}) => reduce(
  [
    prepareAddress(homeAddress, strings('app.label.home'), 'home'),
    prepareAddress(workAddress, strings('app.label.work'), 'work'),
    prepareFavAddresses(favoriteAddresses)
  ],
  (res, item) => ((item && res.concat(item)) || res),
  []
);
