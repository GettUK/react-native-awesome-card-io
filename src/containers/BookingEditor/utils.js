import { map, reduce } from 'lodash';
import { strings } from 'locales';

export const prepareAddress = (address, name) => address && ({ address: { ...address, label: name }, name });

export const prepareFavAddresses = addresses => addresses && map(
  addresses,
  item => ({ ...item, address: { ...item.address, label: item.name } })
);

export const prepareDefaultValues = ({ favoriteAddresses, homeAddress, workAddress }) => reduce(
  [
    prepareAddress(homeAddress, strings('app.label.home')),
    prepareAddress(workAddress, strings('app.label.work')),
    prepareFavAddresses(favoriteAddresses)
  ],
  (res, item) => ((item && res.concat(item)) || res),
  []
);
