import { post } from 'utils';

const notifyDriver = (bookingId, arriveIn) => post('/sms_messages/notify_driver', { bookingId, arriveIn });

export default {
  notifyDriver
};
