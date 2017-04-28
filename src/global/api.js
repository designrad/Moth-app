import endpoints from './endpoints';

export const Endpoints = endpoints;

export function callApi(options) {
  const { endpoint, method, payload, isFormData } = options;
  const url = __DEV__ ?
    `http://78.47.117.65:3001/${endpoint}` :
    `http://78.47.117.65:3001/${endpoint}`;
  const requestOptions = {
    method: method || 'GET',
    headers: isFormData ? { 'Content-Type': 'multipart/form-data', } : { 'Content-Type': 'application/json' },
    body: isFormData ? (payload) : (JSON.stringify(payload))
  };
  return fetch(url, requestOptions)
    .then((response) => {
      const json = response.json();
      return json.then((json) => {
        const { ok } = response;
        if (!ok) {
          return Promise.reject(json.msg);
        }
        return json;
      });
    });
}
