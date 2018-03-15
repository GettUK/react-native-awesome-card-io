import { Client } from 'faye';

import config from 'config';

import { camelizeKeys } from './transform';

const { faye: { path }} = config;

class FayeClient {
  get connection() {
    if (!this._connection) {
      this._connection = new Client(path, {
        retry: 5
      });
    }

    return this._connection;
  }

  on(channel, handler) {
    this._subscription = this.connection.subscribe(ch(channel), message => handler(camelizeKeys(message)));
  }

  once(channel, handler) {
    const subscription = this.on(channel, (message) => {
      handler(message);
      subscription.cancel();
    });

    return subscription;
  }

  closeConnection() {
    this._subscription.cancel();
  }
}

function ch(channel) {
  return (channel && channel[0] !== '/') ? `/${channel}` : channel;
}

export default new FayeClient;
