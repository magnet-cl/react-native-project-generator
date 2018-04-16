import { RSAA } from 'redux-api-middleware';
import API from '../../api';
import types from '../types';

const { session } = types.user;

export function clearSessionError() {
  return {
    type: session.clearError,
  };
}

export function clearLoading() {
  return {
    type: session.clearLoading,
  };
}

export function sessionError(message) {
  return {
    type: session.error,
    payload: {
      message,
    },
  };
}

export function signIn({ email, password }) {
  return async (dispatch) => {
    dispatch(clearSessionError());
    const responseAction = await dispatch({
      [RSAA]: {
        ...API.Users.signIn(),
        body: JSON.stringify({
          email,
          password,
        }),
        types: [session.signInRequest, session.signInSuccess, session.signInFailure],
      },
    });

    const { error, payload: { message } = {} } = responseAction;

    if (error) {
      throw new Error(message);
    }

    return Promise.resolve();
  };
}

export function signUp({
  email, password, firstName, lastName,
}) {
  return async (dispatch) => {
    dispatch(clearSessionError());
    const responseAction = await dispatch({
      [RSAA]: {
        ...API.Users.signUp(),
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
        types: [session.signUpRequest, session.signUpSuccess, session.signUpFailure],
      },
    });

    const { error, payload: { message } = {} } = responseAction;

    if (error) {
      throw new Error(message);
    }

    return Promise.resolve();
  };
}

export function current() {
  return async (dispatch) => {
    dispatch(clearSessionError());
    const responseAction = await dispatch({
      [RSAA]: {
        ...API.Users.current(),
        types: [session.currentRequest, session.currentSuccess, session.currentFailure],
      },
    });

    const { error, payload: { message } = {} } = responseAction;

    if (error) {
      throw new Error(message);
    }

    return Promise.resolve();
  };
}

export function signOut() {
  return async (dispatch) => {
    dispatch(clearSessionError());
    const responseAction = await dispatch({
      [RSAA]: {
        ...API.Users.signOut(),
        types: [session.signOutRequest, session.signOutSuccess, session.signOutFailure],
      },
    });

    const { error, payload: { message } = {} } = responseAction;

    if (error) {
      throw new Error(message);
    }

    return Promise.resolve();
  };
}

export function recoverPassword({ email }) {
  return async (dispatch) => {
    const responseAction = await dispatch({
      [RSAA]: {
        ...API.Users.recoverPassword(),
        body: JSON.stringify({
          email,
        }),
        types: [
          session.recoverPasswordRequest,
          session.recoverPasswordSuccess,
          session.recoverPasswordFailure,
        ],
      },
    });

    const { error, payload: { message } = {} } = responseAction;

    if (error) {
      throw new Error(message);
    }

    return Promise.resolve();
  };
}

export function unauthorized(action) {
  return {
    ...action,
    type: session.unauthorized,
  };
}
