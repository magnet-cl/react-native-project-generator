/* Add default headers to RSAA (Redux Standard API-calling Actions)
* redux-api-middleware RSAA
*/

import { isRSAA, RSAA } from 'redux-api-middleware';
import { hasAuthToken, getAuthToken } from '../../selectors/user/session';

/* middlware signature is store => next => action => result */
const apiHeaders = ({ getState }) => next => (action) => {
  if (!isRSAA(action)) {
    return next(action);
  }

  const state = getState();
  const authHeader = hasAuthToken(state)
    ? {
      Authorization: `JWT ${getAuthToken(state)}`,
    }
    : {};

  const actionWithHeaders = {
    [RSAA]: {
      ...action[RSAA],
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...authHeader,
        ...action[RSAA].headers,
      },
    },
  };

  return next(actionWithHeaders);
};

export default apiHeaders;
