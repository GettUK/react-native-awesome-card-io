import FCM, { FCMEvent } from 'react-native-fcm';

const BOOKING_STATUS_MESSAGE = 'booking_status_change';

class PushNotification {
  registerFCMToken = () => FCM.getFCMToken().then((token) => {
    if (this.token !== token) {
      this.token = token;

      return token;
    }

    return '';
  });

  getNotificationsPermissions = async () => {
    try {
      await FCM.requestPermissions({ badge: false, sound: true, alert: true });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  addNotificationListener = ({ userToken, setActiveBooking }) => {
    this.userToken = userToken;
    this.onOpenHandler = setActiveBooking;

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
          small_icon: 'ic_notification',
          icon: 'ic_notification',
          color: '#2b4983',
          show_in_foreground: true,
          vibrate: 300,
          lights: true,
          status: notif.status,
          booking_id: notif.booking_id,
          statusKind: notif.kind
        });
      }

      FCM.enableDirectChannel();
    });
  };

  onOpenFromTray = (notif) => {
    if (this.userToken && notif) {
      const status = notif.statusKind || notif.kind;

      if (notif.booking_id && status === BOOKING_STATUS_MESSAGE) {
        this.onOpenHandler(notif.booking_id);
      }
    }
  };

  clearNotificationListener = () => {
    this.token = '';

    if (this.notificationListener) this.notificationListener.remove();
  };
}

export default new PushNotification();
