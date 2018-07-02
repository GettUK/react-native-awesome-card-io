export const ORDER_RECEIVED_STATUS = 'order_received';
export const LOCATING_STATUS = 'locating';
export const PREORDER_STATUSES = ['creating', 'processing', 'connected', ORDER_RECEIVED_STATUS, LOCATING_STATUS];
export const POINTER_DISPLAY_STATUSES = ['creating', 'processing', 'connected', LOCATING_STATUS];
export const CANCEL_ALLOWED_STATUSES = ['creating', 'connected', ORDER_RECEIVED_STATUS, LOCATING_STATUS];
export const ARRIVED_STATUS = 'arrived';
export const ACTIVE_STATUS = 'in_progress';
export const DRIVER_ON_WAY = 'on_the_way';
export const ACTIVE_DRIVER_STATUSES = [DRIVER_ON_WAY, ARRIVED_STATUS];
export const COMPLETED_STATUS = 'completed';
export const CANCELLED_STATUS = 'cancelled';
export const REJECTED_STATUS = 'rejected';
export const BILLED_STATUS = 'billed';
export const IN_PROGRESS_STATUS = 'in_progress';
export const CUSTOMER_CARE_STATUS = 'customer_care';
export const FINAL_STATUSES = [
  COMPLETED_STATUS,
  CANCELLED_STATUS,
  REJECTED_STATUS,
  BILLED_STATUS,
  CUSTOMER_CARE_STATUS
];
