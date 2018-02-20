import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { navigationPropTypesShape } from '../../navigation';

class HomeScreen extends Component {
  render() {
    const {
      isGuest,
      firstName,
      lastName,
      email,
      navigation,
      error,
      signOut,
    } = this.props;
    return (
      <View>
        <Text>Home</Text>
        {isGuest ? (
          <View>
            <Button
              onPress={() => navigation.navigate('SignIn')}
              title="Sign In"
            />
            <Button
              onPress={() => navigation.navigate('SignUp')}
              title="Sign Up"
            />
          </View>
        ) : (
          <Fragment>
            <Text>
              Welcome back {firstName} {lastName} ({email}){' '}
            </Text>
            {error && <Text>Error: {error}</Text>}
            <Button onPress={signOut} title="Log Out" />
          </Fragment>
        )}
      </View>
    );
  }
}

HomeScreen.navigationOptions = ({ navigation: { goBack } }) => ({
  title: 'Home',
});

HomeScreen.defaultProps = {
  isGuest: false,
  email: '',
  firstName: '',
  lastName: '',
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape(navigationPropTypesShape),
  isGuest: PropTypes.bool,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  signOut: PropTypes.func.isRequired,
};

export default HomeScreen;
