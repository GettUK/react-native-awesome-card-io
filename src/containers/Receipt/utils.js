import config from 'config';

// eslint-disable-next-line import/prefer-default-export
export const getReceiptUrl = orderId => `${config.baseUrl}/documents/receipt.pdf?booking_id=${orderId}`;
