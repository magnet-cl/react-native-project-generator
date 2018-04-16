/* Check response from RSAA (Redux Standard API-calling Actions)
* and react in case of HTTP codes 401, 426.
*/
import { unauthorized } from '../../actions/user/session';
import types from '../../actions/types';

const apiResponse = ({ dispatch }) => next => (action) => {
  if (
    !action.error ||
    action.payload.name !== 'ApiError' ||
    action.type === types.user.session.unauthorized
  ) {
    return next(action);
  }

  if (action.payload.status === 401) {
    next(action);
    dispatch(unauthorized(action));
  } else if (action.payload.status === 426) {
    // TODO upgrade required
  } else {
    return next(action);
  }

  return null;
};

export default apiResponse;
