import endpoints from './endpoints';
export const Endpoints = endpoints;

export function callApi(options) {
  const { endpoint, method, payload } = options;

  const url = __DEV__ ?
    `http://192.168.88.130:3001/${endpoint}` :
    `https://subster-api.herokuapp.com/${endpoint}`;
  const requestOptions = {
    method: method || 'GET',
    headers: { 'cache-control': 'no-cache' },
    body: payload
  };


  return fetch(url, requestOptions)
    .then((response) => {
      const json = response.json();
      return json.then((json) => {
        const { ok } = response;
        if (!ok) {
          // console.log(`Request executed from ${endpoint} with failure:`, { json, response });
          return Promise.reject(json.msg);
        }
        // console.log(`Request executed successfully from ${endpoint}`, { response, json });
        return json;
      });
    });
};
