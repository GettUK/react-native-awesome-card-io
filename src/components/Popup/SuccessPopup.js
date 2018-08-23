import React from 'react';

import { Icon } from 'components';

import Popup from './Popup';

import styles from './style';

const SuccessPopup = ({ innerRef, title, content = null, buttons = null }) => (
  <Popup
    innerRef={innerRef}
    icon={<Icon size={70} name="registration" />}
    contentWraperStyle={styles.contentWraperStyle}
    titleStyle={styles.titleStyle}
    title={title}
    contentStyle={content && styles.popupInfo}
    content={content}
    buttons={buttons}
  />
);

export default SuccessPopup;
