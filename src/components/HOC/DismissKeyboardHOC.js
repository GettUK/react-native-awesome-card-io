import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const DismissKeyboardHOC = Comp => ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Comp {...props}>{children}</Comp>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardHOC;
