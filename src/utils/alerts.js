import { strings } from 'locales';
import { AlertModal } from 'components';

export function showConfirmationAlert({ title, message = strings('areYouSure'), handler = () => {} }) {
  AlertModal.show(
    title,
    message,
    [
      { title: strings('no'), style: 'cancel' },
      { title: strings('yes'), onPress: handler }
    ]
  );
}

export function showMessageAlert({ title = '', message = '' }) {
  return AlertModal.show(
    title,
    message,
    [
      { title: strings('ok') }
    ]
  );
}

export function showRemovalAlert({
  title = '',
  message = strings('confirmDelete'),
  deleteLabel = strings('delete'),
  handler = () => {}
}) {
  return AlertModal.show(
    title,
    message,
    [
      { title: strings('cancel'), style: 'cancel' },
      { title: deleteLabel, onPress: handler }
    ]
  );
}
