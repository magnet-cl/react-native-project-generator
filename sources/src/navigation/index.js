import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import AppNavigator from './screens';
import { addListener } from './utils';

/*
* Recursive function to check whenever we are on the root screen
* in android, so we should exit the app.
* when onBackPress returns true -> does not exit app
* when onBackPress return false -> app closes in android
* Nested navigator should only close the app if we are deeply
* positioned on index 0 of all nested navigators, otherwise we
* should return true and dispatch Back action.
*
* isRootScreen returns true when we are deeply positioned at indexes 0
* all the way down in our current navigators.
*/
function isRootScreen(navigator) {
  // We reach this point if before all indexes above were 0
  // And we don't have any routes below, we are in the root.
  if (navigator.index == null) {
    return true;
  }

  // We reach this point if any route has index different than 0,
  // We are not in the root.
  if (navigator.index > 0) {
    return false;
  }

  // If we dont have nested routes, we are in the root.
  // Otherwise, we recursiveely check if any children is not in the root, if so,
  // We are not in the root and we return false.
  return !navigator.routes || !navigator.routes.find(route => !isRootScreen(route));
}

class ReduxNavigation extends Component {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    const { dispatch, nav } = this.props;
    if (!isRootScreen(nav)) {
      dispatch(NavigationActions.back());
      return true; // return true does not exits app.
    }

    return false;
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    });

    return <AppNavigator navigation={navigation} />;
  }
}

const navigationPropTypesShape = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({ index: PropTypes.number, routes: PropTypes.array }).isRequired,
};

ReduxNavigation.propTypes = navigationPropTypesShape;

const mapStateToProps = state => ({
  nav: state.navigation,
});

const ConnectedNavigator = connect(mapStateToProps)(ReduxNavigation);
export { AppNavigator, navigationPropTypesShape };
export default ConnectedNavigator;
