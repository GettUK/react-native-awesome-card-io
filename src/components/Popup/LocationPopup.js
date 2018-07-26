import React from 'react';

import { strings } from 'locales';

import Popup from './Popup';

import styles from './style';

const LocationPopup = ({ innerRef, onPress }) => (
  <Popup
    ref={innerRef}
    titleStyle={styles.popupLocationTitle}
    title={strings('popup.locationService.title')}
    buttons={[
      {
        title: strings('popup.locationService.button.сancel'),
        style: styles.btnStyle,
        textStyle: styles.btnTextStyle
      },
      {
        title: strings('popup.locationService.button.сonfirm'),
        onPress
      }
    ]}
  />
);

export default LocationPopup;
