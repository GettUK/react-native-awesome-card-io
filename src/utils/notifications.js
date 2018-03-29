import FCM, { FCMEvent } from 'react-native-fcm';

import { setActiveBooking } from 'actions/booking';

const BOOKING_STATUS_MESSAGE = 'booking_status_change';

class PushNotification {
  registerFCMToken = () => FCM.getFCMToken().then((token) => {
    if (this.token !== token) {
      this.token = token;

      return token;
    }

    return '';
  });

  getNotificationsPermissions = () => {
    try {
      FCM.requestPermissions({ badge: false, sound: true, alert: true });
    } catch (e) {
      console.error(e);
    }
  };

  addNotificationListener = ({ userToken, navigator }) => {
    this.userToken = userToken;
    this.navigator = navigator;

    FCM.getInitialNotification().then((notif) => {
      this.onOpenFromTray(notif);
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      if (notif.local_notification) {
        return;
      }

      if (notif.opened_from_tray) {
        this.onOpenFromTray(notif);

        return;
      }

      if ((notif.fcm && notif.fcm.body) || (notif.aps && notif.aps.alert)) {
        FCM.presentLocalNotification({
          body: notif.fcm ? notif.fcm.body : notif.aps.alert,
          priority: 'high',
          sound: 'default',
          large_icon: 'ic_launcher',
          icon: 'ic_launcher',
          show_in_foreground: true,
          vibrate: 300,
          lights: true,
          status: notif.status
        });
      }

      FCM.enableDirectChannel();
    });
  };

  onOpenFromTray = (notif) => {
    if (this.userToken && notif) {
      if (notif.booking_id && notif.kind === BOOKING_STATUS_MESSAGE) {
        this.navigator.dispatch(setActiveBooking(notif.booking_id));
      }
    }
  };

  clearNotificationListener = () => {
    this.token = '';

    if (this.notificationListener) this.notificationListener.remove();
  };
}

export default new PushNotification();
