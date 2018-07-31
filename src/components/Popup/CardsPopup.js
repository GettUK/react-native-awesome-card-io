import React from 'react';
import { Text } from 'react-native';

import { strings } from 'locales';

import Popup from './Popup';

import styles from './style';

const CardsPopup = ({ innerRef }) => (
  <Popup
    ref={innerRef}
    titleStyle={styles.popupLocationTitle}
    title={strings('popup.cards.title')}
    content={<Text style={styles.popupCards}>{strings('popup.cards.description')}</Text>}
  />
);

export default CardsPopup;
