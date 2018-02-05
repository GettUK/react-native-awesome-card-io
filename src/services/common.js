export function processResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.text().then(text => (text ? JSON.parse(text) : {}));
  }

  return response.json().then(errors => Promise.reject(errors));
}

export function processErrors() {
  return Promise.reject({
    non_field_errors: ['Something wrong... Try again.']
  });
}
