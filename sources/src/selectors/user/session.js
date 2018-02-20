const getSession = state => state.user.session;

export const hasAuthToken = state => {
  const session = getSession(state);
  return !!session.authToken;
};

export const getAuthToken = state => {
  const session = getSession(state);
  return session.authToken;
};

export const isGuest = state => {
  const session = getSession(state);
  return session.isGuest;
};

export const getSessionError = state => {
  const session = getSession(state);
  return session.error;
};

export const getSessionLoading = state => {
  const session = getSession(state);
  return session.loading;
};

export const getSessionFirstName = state => {
  const session = getSession(state);
  return session.firstName;
};

export const getSessionLastName = state => {
  const session = getSession(state);
  return session.lastName;
};

export const getSessionEmail = state => {
  const session = getSession(state);
  return session.email;
};
