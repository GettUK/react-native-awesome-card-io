import { strings } from 'locales';

import styles from './style';

function prepareName({ firstName = '', lastName = '' }) {
  return `${firstName} ${lastName}`;
}

export function prepareInitials({ firstName = '', lastName = '' }) {
  return `${(firstName).charAt(0)}${(lastName).charAt(0)}`.toUpperCase();
}

export function prepareProfileBlock(data = {}, handlers = {}) {
  return [
    {
      title: prepareName(data),
      avatar: data.avatarUrl || null,
      titleAvatar: prepareInitials(data),
      onPress: handlers.goToEditProfile,
    },
    {
      title: strings('settings.label.phone'),
      rightTitle: data.phone || ''
    },
    {
      title: strings('settings.label.email'),
      rightTitle: data.email || ''
    },
    {
      title: strings('settings.label.cartype'),
      rightTitle: data.defaultVehicle || strings('settings.none')
    }
  ];
}

export function prepareAddressesBlock(data = {}, handlers = {}) {
  return [
    {
      leftIconName: 'home',
      title: strings('label.home'),
      rightTitle: data.homeAddress && data.homeAddress.line || strings('settings.none')
    },
    {
      leftIconName: 'work',
      title: strings('label.work'),
      rightTitle: data.workAddress && data.workAddress.line || strings('settings.none')
    },
    {
      title: strings('settings.label.addresses')
    }
  ];
}

export function prepareSwitchersBlock(data = {}, handlers = {}) {
  return [
    {
      leftIconName: 'email',
      title: strings('settings.label.email'),
      switchButton: true,
      switched: data.notifyWithEmail || false
    },
    {
      leftIconName: 'sms',
      title: strings('settings.label.sms'),
      switchButton: true,
      switched: data.notifyWithSms || false
    },
    {
      leftIconName: 'push',
      title: strings('settings.label.notification'),
      switchButton: true
    },
    {
      leftIconName: 'calendar',
      title: strings('settings.label.invites'),
      switchButton: true,
      switched: data.notifyWithCalendarEvent || false
    },
    {
      leftIconName: 'wheelchair',
      title: strings('settings.label.wheelchair'),
      switchButton: true,
      switched: data.wheelchairUser || false
    }
  ];
}

export function prepareHistoryBlock(data = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.payments')
    },
    {
      title: strings('settings.label.rides')
    }
  ];
}

export function prepareInfoBlock(data = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.privacy')
    },
    {
      title: strings('settings.label.terms')
    },
    {
      title: strings('settings.label.faqs')
    },
    {
      title: strings('settings.label.locationInfo')
    }
  ];
}

export function prepareLogoutBlock(data = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.logout'),
      onPress: handlers.onLogout,
      showRightIcon: false,
      titleStyle: styles.listLabelCentered
    }
  ];
}
