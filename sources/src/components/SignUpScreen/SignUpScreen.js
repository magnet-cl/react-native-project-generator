import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Button,
  Text,
  TextInput,
} from 'react-native';
import { navigationPropTypesShape } from '../../navigation';
import LoadingModal from '../LoadingModal';
import styles from './styles';

const behavior = Platform.OS === 'ios' ? { behavior: 'padding' } : {};

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.onSignUpPress = this.onSignUpPress.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.clearSessionError();
    this.props.clearLoading();
  }

  onChangeField(key, text) {
    this.setState({
      [key]: text,
    });
  }

  onSignUpPress() {
    const { email, password, firstName, lastName } = this.state;
    const { navigation, signUp } = this.props;
    Keyboard.dismiss();
    signUp({
      email,
      password,
      firstName,
      lastName,
    })
      .then(() => navigation.goBack(null))
      .catch(() => {
        // TODO handle error on this level
      });
  }

  render() {
    const { firstName, lastName, email, password } = this.state;

    const { navigation, error, loading } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={64}
        {...behavior}
      >
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <LoadingModal isVisible={loading} />
          <View style={styles.form}>
            <Text style={styles.formTitle}>{'Registrarme'}</Text>
            {error && <Text style={styles.formError}>{error}</Text>}
            <View style={styles.inputGroup}>
              <Text>Nombre</Text>
              <TextInput
                value={firstName}
                autoFocus
                onChangeText={text => this.onChangeField('firstName', text)}
              />
              <Text>Apellido</Text>
              <TextInput
                value={lastName}
                onChangeText={text => this.onChangeField('lastName', text)}
              />
              <Text>Correo electrónico</Text>
              <TextInput
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={text => this.onChangeField('email', text)}
              />
              <Text>Contraseña</Text>
              <TextInput
                value={password}
                secureTextEntry
                selectTextOnFocus
                onChangeText={text => this.onChangeField('password', text)}
              />
            </View>
            <Button
              title="Registrarme"
              disabled={Object.values(this.state).some(
                value => value.length === 0,
              )}
              onPress={this.onSignUpPress}
            />
            <Button
              style={styles.loginTextButton}
              onPress={() => {
                navigation.goBack(null);
                navigation.navigate('SignIn');
              }}
              title={'Iniciar Sesión'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

SignUpScreen.navigationOptions = ({
  navigation: { goBack, state: { params = {} } },
}) => ({
  title: 'Registrarme',
});

SignUpScreen.defaultProps = {
  error: undefined,
  loading: false,
};

SignUpScreen.propTypes = {
  clearSessionError: PropTypes.func.isRequired,
  clearLoading: PropTypes.func.isRequired,
  navigation: PropTypes.shape(navigationPropTypesShape).isRequired,
  signUp: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default SignUpScreen;
