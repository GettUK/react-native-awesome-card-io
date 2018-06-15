import config from 'config';
import { normalizeCoordinate } from 'utils';


const siftArray = (array, limit) =>
  Array.from(new Array(limit)).map((_, i) => array[Math.round(i * (array.length / limit))]);

const expandArray = (array, limit) =>
  Array.from(new Array(limit)).map((_, i) => array[Math.round(i / (limit / array.length))]);

export const fixPathLength = (path, limit) => {
  const array = path.length > limit ? siftArray(path, limit) : expandArray(path, limit);
  return array.filter(Boolean);
};

/* eslint-disable */
const decodePoints = (t, e) => {
  for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
    a = null, h = 0, i = 0;
    do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
    n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
    do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
    o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
  }

  return d = d.map(function (t) {
    return {
      latitude: t[0],
      longitude: t[1]
    };
  });
};
/* eslint-disable */

export const getPathCoordinates = (o, d) => {
  const apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';
  const params = [
    'language=en',
    'mode=walking',
    `origin=${o.lat},${o.lng}`,
    `destination=${d.lat},${d.lng}`,
    `key=${config.googleAPIKey}`
  ];

  return fetch(`${apiUrl}?${params.join('&')}`)
    .then(response => response.json())
    .then(json => (json.routes[0] ? decodePoints(json.routes[0].overview_polyline.points) : null));
};

export const getRandomCoordinatesInRadius = ({ origin, amount, radius }) => {
  const angle = 360 / amount;
  const angles = Array.from(new Array(amount)).map((_, i) => angle * i);

  return angles.map((angle) => {
    const latDiff = (radius * Math.cos(angle * (Math.PI / 180)));
    const lngDiff = (radius * Math.sin(angle * (Math.PI / 180)));

    return {
      lat: normalizeCoordinate(origin.lat + latDiff),
      lng: normalizeCoordinate(origin.lng + lngDiff)
    };
  });
};
