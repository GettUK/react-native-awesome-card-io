import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { destroyFavoriteAddress } from 'actions/passenger';
import { strings } from 'locales';
import { showConfirmationAlert } from 'utils';

const DestroyFavouriteAddressBtn = ({ id, destroyFavoriteAddress, navigation }) => {
  const destroyAddress = () =>
    destroyFavoriteAddress(id)
      .then(() => navigation.goBack(null));

  const handleDestroy = () => {
    showConfirmationAlert({ title: strings('settings.deleteAddress'), handler: destroyAddress });
  };

  return (
    <TouchableOpacity onPress={handleDestroy} style={{ paddingRight: 14 }}>
      <Text style={{ fontSize: 17, color: '#284784' }}>{strings('settings.delete')}</Text>
    </TouchableOpacity>
  );
};

DestroyFavouriteAddressBtn.propTypes = {
  id: PropTypes.number,
  destroyFavoriteAddress: PropTypes.func,
  navigation: PropTypes.object
};

export default connect(null, { destroyFavoriteAddress })(DestroyFavouriteAddressBtn);
