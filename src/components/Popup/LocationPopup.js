import React from 'react';

import { strings } from 'locales';

import { withTheme } from 'providers';

import Popup from './Popup';

import styles from './style';

const LocationPopup = ({ popupRef, theme, onPress }) => (
  <Popup
    innerRef={popupRef}
    titleStyle={styles.popupLocationTitle}
    title={strings('popup.locationService.title')}
    buttons={[
      {
        title: strings('popup.locationService.button.сancel'),
        style: [styles.btnStyle, { backgroundColor: theme.color.bgSecondary }],
        textStyle: styles.btnTextStyle
      },
      {
        title: strings('popup.locationService.button.сonfirm'),
        onPress
      }
    ]}
  />
);

export default withTheme(LocationPopup);
