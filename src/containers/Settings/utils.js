import { strings } from 'locales';

function prepareName({ first_name = '', last_name = '' }) {
  return `${first_name} ${last_name}`;
}

function prepareInitials({ first_name = '', last_name = '' }) {
  return `${(first_name).charAt(0)}${(last_name).charAt(0)}`.toUpperCase();
}

export function prepareProfileBlock(results = {}, handlers = {}) {
  return [
    {
      title: prepareName(results),
      avatar: results.avatar_url || null,
      titleAvatar: prepareInitials(results)
    },
    {
      title: strings('settings.label.phone'),
      rightTitle: results.phone || ''
    },
    {
      title: strings('settings.label.email'),
      rightTitle: results.email || ''
    },
    {
      title: strings('settings.label.cartype'),
      rightTitle: results.default_vehicle || strings('settings.none')
    }
  ];
}

export function prepareAddressesBlock(results = {}, handlers = {}) {
  return [
    {
      leftIconName: 'home',
      title: strings('settings.label.home'),
      rightTitle: results.home_address && results.home_address.line || strings('settings.none')
    },
    {
      leftIconName: 'work',
      title: strings('settings.label.work'),
      rightTitle: results.work_address && results.work_address.line || strings('settings.none')
    },
    {
      title: strings('settings.label.addresses')
    }
  ];
}

export function prepareSwitchersBlock(results = {}, handlers = {}) {
  return [
    {
      leftIconName: 'email',
      title: strings('settings.label.email'),
      switchButton: true,
      switched: results.notify_with_email || false
    },
    {
      leftIconName: 'sms',
      title: strings('settings.label.sms'),
      switchButton: true,
      switched: results.notify_with_sms || false
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
      switched: results.notify_with_calendar_event || false
    },
    {
      leftIconName: 'wheelchair',
      title: strings('settings.label.wheelchair'),
      switchButton: true,
      switched: results.wheelchair_user || false
    }
  ];
}

export function prepareHistoryBlock(results = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.payments')
    },
    {
      title: strings('settings.label.rides')
    }
  ];
}

export function prepareInfoBlock(results = {}, handlers = {}) {
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

export function prepareLogoutBlock(results = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.logout'),
      onPress: handlers.onLogout
    }
  ]
}
