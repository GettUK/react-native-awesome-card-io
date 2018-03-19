const order = {
  scheduled_type: 'now',
  travel_reason_id: '',
  booker_references: [
    { booking_reference_id: 14, mandatory: false, conditional: false },
    { booking_reference_id: 32, mandatory: false, conditional: false },
    {
      booking_reference_id: 33, mandatory: true, conditional: false, value: '121231223'
    },
    { booking_reference_id: 34, mandatory: false, conditional: false }
  ],
  schedule: {
    custom: false, preset_type: 'daily', recurrence_factor: '1', weekdays: [], scheduled_ats: []
  },
  payment_type: 'account',
  payment_method: 'account',
  payment_card_id: null,
  pickup_address: {
    id: 787,
    line: '11 Soho Square, Soho, London W1D 3QD, UK',
    lat: 51.5157316,
    lng: -0.1326755,
    created_at: '2017-07-24T09:15:31.464+00:00',
    updated_at: '2017-12-22T14:32:59.804+00:00',
    postal_code: 'W1D 3QD',
    references_count: 1575,
    country_code: 'GB',
    timezone: 'Europe/London',
    city: 'London'
  },
  message: 'Pick up: rqweerqweer',
  passenger_id: 3,
  passenger_name: 'Artem1 Korenev1',
  passenger_phone: '447412972193',
  destination_address: {
    id: 961,
    line: '221B Baker Street Agency, High Rd, London N22 8JA, UK',
    lat: 51.604473,
    lng: -0.1120943,
    created_at: '2017-10-11T10:33:10.288+00:00',
    updated_at: '2017-12-22T14:29:34.605+00:00',
    postal_code: 'N22 8JA',
    references_count: 425,
    country_code: 'GB',
    timezone: 'Europe/London',
    city: 'London'
  },
  vehicle_name: 'BlackTaxi',
  vehicle_value: '5178cd83-20bf-4991-b559-c1128dfae662',
  vehicle_price: 3600
};

export default order;
