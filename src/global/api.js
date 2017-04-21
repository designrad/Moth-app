import endpoints from './endpoints';

export const Endpoints = endpoints;

export function callApi(options) {
  const { endpoint, method, payload, isFormData } = options;
  const url = __DEV__ ?
    `http://192.168.88.130:3001/${endpoint}` :
    `/${endpoint}`;
  const requestOptions = {
    method: method || 'GET',
    headers: isFormData ? { 'cache-control': 'no-cache' } : { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };


  return fetch(url, requestOptions)
    .then((response) => {
      const json = response.json();
      console.log(requestOptions);
      return json.then((json) => {
        const { ok } = response;
        if (!ok) {
          return Promise.reject(json.msg);
        }
        return json;
      });
    });
}
