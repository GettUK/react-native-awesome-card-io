import { Alert } from 'react-native';
import { strings } from 'locales';

export default function showConfirmationAlert({ title, message = strings('areYouSure'), handler = () => {} }) {
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
