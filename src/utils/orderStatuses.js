export const PREORDER_STATUSES = ['creating', 'connected', 'order_received', 'locating'];
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
