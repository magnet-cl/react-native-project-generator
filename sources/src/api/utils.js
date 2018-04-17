import URI from 'urijs';
import { HOST, PORT, BASE_PATH, PROTOCOL } from './config';

export const METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function apiPath(resource, query) {
  return new URI({
    protocol: PROTOCOL,
    hostname: HOST,
    port: PORT,
    path: `${BASE_PATH}/${resource}`,
    query,
  })
    .normalize()
    .toString();
}

export const apiObject = (resource, { method = 'GET', query } = {}) => ({
  endpoint: apiPath(resource, query),
  method,
});
