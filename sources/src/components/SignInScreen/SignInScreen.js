import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, Keyboard, Button, TextInput, Text } from 'react-native';
import { navigationPropTypesShape } from '../../navigation';
import KeyboardSpacer from '../KeyboardSpacer';
import LoadingModal from '../LoadingModal';

import styles from './styles';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.onSignInPress = this.onSignInPress.bind(this);
    this.onRecoverPasswordPress = this.onRecoverPasswordPress.bind(this);
    this.state = {
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

  onSignInPress() {
    const { email, password } = this.state;
    const { navigation, signIn } = this.props;
    Keyboard.dismiss();
    signIn({ email, password })
      .then(() => navigation.goBack(null))
      .catch(() => {
        // TODO handle error on this level
      });
  }

  onRecoverPasswordPress() {
    const { email } = this.state;
    const { recoverPassword } = this.props;
    Keyboard.dismiss();
    recoverPassword({ email }).then(() => {
      Alert.alert(
        'Recuperar Contraseña',
        `Se envió un correo a ${email} con instrucciones para recuperar tu contraseña.`,
        [{ text: 'OK' }],
      );
    });
  }

  render() {
    const { email, password } = this.state;
    const { error, loading, navigation } = this.props;
    return (
      <View style={styles.container}>
        <LoadingModal isVisible={loading} />
        <View style={styles.form}>
          <Text style={styles.formTitle}>{'Iniciar Sesión'}</Text>
          {error && <Text style={styles.formError}>{error}</Text>}
          <View style={styles.inputGroup}>
            <Text>Correo electrónico</Text>
            <TextInput
              value={email}
              autoFocus
              autoCapitalize="none"
              keyboardType="email-address"
              enablesReturnKeyAutomatically
              returnKeyType="next"
              onChangeText={text => this.onChangeField('email', text)}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <Text>Contraseña</Text>
            <TextInput
              value={password}
              secureTextEntry
              selectTextOnFocus
              enablesReturnKeyAutomatically
              returnKeyType="send"
              ref={i => {
                this.passwordInput = i;
              }}
              onChangeText={text => this.onChangeField('password', text)}
              onSubmitEditing={this.onSignInPress}
            />
          </View>
          <Button
            title="Iniciar Sesión"
            disabled={!email || !password}
            onPress={this.onSignInPress}
          />
          <Button
            onPress={this.onRecoverPasswordPress}
            disabled={!email}
            title={'Olvidé mi contraseña'}
          />
          <Button
            style={styles.loginTextButton}
            onPress={() => {
              navigation.goBack(null);
              navigation.navigate('SignUp');
            }}
            title={'Registrarme'}
          />
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

SignInScreen.navigationOptions = ({ navigation: { goBack } }) => ({
  title: 'Iniciar Sesión',
});

SignInScreen.defaultProps = {
  error: undefined,
  loading: false,
};

SignInScreen.propTypes = {
  clearSessionError: PropTypes.func.isRequired,
  clearLoading: PropTypes.func.isRequired,
  navigation: PropTypes.shape(navigationPropTypesShape).isRequired,
  signIn: PropTypes.func.isRequired,
  recoverPassword: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default SignInScreen;
