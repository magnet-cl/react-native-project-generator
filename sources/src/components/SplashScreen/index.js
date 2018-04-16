import { connect } from 'react-redux';
import SplashScreen from './SplashScreen';
import { hasAuthToken } from '../../selectors/user/session';
import { current as getCurrent } from '../../actions/user/session';

export default connect(
  state => ({
    hasAuthToken: hasAuthToken(state),
  }),
  {
    getCurrent,
  },
)(SplashScreen);
