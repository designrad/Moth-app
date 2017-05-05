import endpoints from './endpoints';
import { ipServer } from '../global/constants';

export const Endpoints = endpoints;
// Api for the server
export function callApi(options) {
  const { endpoint, method, payload, isFormData } = options;
  const url = `http://${ipServer}/${endpoint}`;
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
