import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signOut } from '../../actions/user/session';

import {
  isGuest,
  getSessionEmail,
  getSessionFirstName,
  getSessionLastName,
  getSessionError,
} from '../../selectors/user/session';

import HomeScreen from './HomeScreen';

export default connect(
  state => ({
    isGuest: isGuest(state),
    email: getSessionEmail(state),
    firstName: getSessionFirstName(state),
    lastName: getSessionLastName(state),
    error: getSessionError(state),
  }),
  {
    signOut,
  },
)(HomeScreen);
