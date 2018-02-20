import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text } from 'react-native';
import styles from './styles';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.beginAnimation = this.beginAnimation.bind(this);
    this.state = {
      opacity: new Animated.Value(0),
      error: false,
      completed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { getCurrent } = this.props;
    const { completed } = this.state;

    if (completed) {
      return;
    }

    if (nextProps.bootstraped && nextProps.hasAuthToken) {
      this.beginAnimation();
    } else if (nextProps.bootstraped) {
      getCurrent().catch(() => this.setState({ error: true }));
    }
  }

  beginAnimation() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => this.setState({ completed: true }));
  }

  render() {
    // TODO: do it right
    const { children, bootstraped, hasAuthToken } = this.props;
    const { opacity, error, completed } = this.state;

    if (!completed && error) {
      return (
        <View style={[styles.container, styles.error]}>
          <Text>Ha ocurrido un error :(</Text>
        </View>
      );
    }

    if (!completed && (!bootstraped || !hasAuthToken)) {
      return <View style={styles.container} />;
    }

    return (
      <View style={styles.container}>
        <Animated.View style={{ flex: 1, opacity }}>{children}</Animated.View>
      </View>
    );
  }
}

SplashScreen.propTypes = {
  bootstraped: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  getCurrent: PropTypes.func.isRequired,
  hasAuthToken: PropTypes.bool.isRequired,
};

export default SplashScreen;
