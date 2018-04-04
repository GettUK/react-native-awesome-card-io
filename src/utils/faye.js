import { Client } from 'faye';
import config from 'config';
import { camelizeKeys } from './transform';

const { faye: { path } } = config;

function ch(channel) {
  return (channel && channel[0] !== '/') ? `/${channel}` : channel;
}

class FayeClient {
  getConnection() {
    if (!this.connection) {
      this.connection = new Client(path, {
        retry: 5
      });
    }

    return this.connection;
  }

  on(channel, handler) {
    this.subscription = this.getConnection().subscribe(ch(channel), message => handler(camelizeKeys(message)));
  }

  once(channel, handler) {
    const subscription = this.on(channel, (message) => {
      handler(message);
      subscription.cancel();
    });

    return subscription;
  }

  closeConnection() {
    if (this.subscription) {
      this.subscription.cancel();
    }
  }
}

export default new FayeClient();
