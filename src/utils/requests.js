import axios from './axios';

export function get(url, data = {}, options = {}) {
  return axios.get(url, { params: data, ...options });
}

export function post() {
  return axios.post(...arguments);
}
export function put() {
  return axios.put(...arguments);
}

export function patch() {
  return axios.patch(...arguments);
}

export function destroy() {
  return axios.delete(...arguments);
}
