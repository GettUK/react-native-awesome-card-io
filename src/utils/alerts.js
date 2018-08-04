import { strings } from 'locales';
import { AlertModal } from 'components';

export function showConfirmationAlert({
  theme,
  title,
  message = strings('alert.message.areYouSure'),
  handler = () => {}
}) {
  AlertModal.show(
    theme,
    title,
    message,
    [
      { title: strings('alert.button.no'), style: 'cancel' },
      { title: strings('alert.button.yes'), onPress: handler }
    ]
  );
}

export function showMessageAlert({ theme, title = '', message = '' }) {
  return AlertModal.show(
    theme,
    title,
    message,
    [
      { title: strings('alert.button.ok') }
    ]
  );
}

export function showRemovalAlert({
  theme,
  title = '',
  message = strings('alert.message.doYouWantToDelete'),
  deleteLabel = strings('alert.button.delete'),
  handler = () => {}
}) {
  return AlertModal.show(
    theme,
    title,
    message,
    [
      { title: strings('alert.button.cancel'), style: 'cancel' },
      { title: deleteLabel, onPress: handler }
    ]
  );
}
