import { apiObject } from './utils';

export default {
  signIn() {
    return apiObject('users/sign-in', {
      method: 'POST',
    });
  },
  signUp() {
    return apiObject('users', {
      method: 'POST',
    });
  },
  current() {
    return apiObject('users/current');
  },
  signOut() {
    return apiObject('users/sign-out', {
      method: 'POST',
    });
  },
  recoverPassword() {
    return apiObject('users/password', {
      method: 'POST',
    });
  },
};
