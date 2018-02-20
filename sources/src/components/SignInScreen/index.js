import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignInScreen from './SignInScreen';
import * as sessionActions from '../../actions/user/session';
import {
  getSessionError,
  getSessionLoading,
} from '../../selectors/user/session';

export default connect(
  state => ({
    error: getSessionError(state),
    loading: getSessionLoading(state),
  }),
  dispatch => bindActionCreators(sessionActions, dispatch),
)(SignInScreen);
