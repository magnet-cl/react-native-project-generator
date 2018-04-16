import types from '../../actions/types';

const initialState = {
  authToken: undefined,
  error: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  isGuest: true,
  loading: false,
};

export { initialState };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case types.user.session.clearError: {
      return {
        ...state,
        error: undefined,
      };
    }
    case types.user.session.clearLoading: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.user.session.signInRequest:
    case types.user.session.signUpRequest:
    case types.user.session.signOutRequest:
    case types.user.session.currentRequest: {
      const { error, payload: { message } = {} } = action;
      return {
        ...state,
        loading: !error,
        error: error && message,
      };
    }
    case types.user.session.currentSuccess:
    case types.user.session.signInSuccess:
    case types.user.session.signUpSuccess:
    case types.user.session.signOutSuccess: {
      const {
        message, token, user: {
          firstName, lastName, email, isGuest,
        } = {},
      } = action.payload;
      return {
        ...state,
        authToken: token,
        loading: false,
        error: message,
        firstName,
        lastName,
        email,
        isGuest,
      };
    }
    case types.user.session.signUpFailure:
    case types.user.session.signInFailure:
    case types.user.session.signOutFailure:
    case types.user.session.currentFailure: {
      const { response: { message } = {} } = action.payload;
      return {
        ...state,
        loading: false,
        error: message,
      };
    }
    case types.user.session.unauthorized: {
      const {
        message,
        token,
        user: {
          firstName, lastName, email, isGuest,
        } = {},
      } = action.payload.response;
      return {
        ...state,
        authToken: token,
        loading: false,
        error: message,
        firstName,
        lastName,
        email,
        isGuest,
      };
    }
    default: {
      return state;
    }
  }
}
