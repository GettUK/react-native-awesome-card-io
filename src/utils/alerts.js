import { strings } from 'locales';
import { AlertModal } from 'components';

export function showConfirmationAlert({ title, message = strings('alert.message.areYouSure'), handler = () => {} }) {
  AlertModal.show(
    title,
    message,
    [
      { title: strings('alert.button.no'), style: 'cancel' },
      { title: strings('alert.button.yes'), onPress: handler }
    ]
  );
}

export function showMessageAlert({ title = '', message = '' }) {
  return AlertModal.show(
    title,
    message,
    [
      { title: strings('alert.button.ok') }
    ]
  );
}

export function showRemovalAlert({
  title = '',
  message = strings('alert.message.doYouWantToDelete'),
  deleteLabel = strings('alert.button.delete'),
  handler = () => {}
}) {
  return AlertModal.show(
    title,
    message,
    [
      { title: strings('alert.button.cancel'), style: 'cancel' },
      { title: deleteLabel, onPress: handler }
    ]
  );
}
