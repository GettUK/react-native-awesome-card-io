import { Alert } from 'react-native';
import { strings } from 'locales';

export function showConfirmationAlert({ title, message = strings('areYouSure'), handler = () => {} }) {
  return Alert.alert(
    title,
    message,
    [
      { text: strings('no'), style: 'cancel' },
      { text: strings('yes'), onPress: handler }
    ],
    { cancelable: false }
  );
}

export function showMessageAlert({ title = '', message = '' }) {
  return Alert.alert(
    title,
    message,
    [
      { text: strings('ok') }
    ],
    { cancelable: false }
  );
}

export function showRemovalAlert({
  title = '',
  message = strings('confirmDelete'),
  deleteLabel = strings('delete'),
  handler = () => {}
}) {
  return Alert.alert(
    title,
    message,
    [
      { text: strings('cancel'), style: 'cancel' },
      { text: deleteLabel, style: 'destructive', onPress: handler }
    ],
    { cancelable: false }
  );
}
