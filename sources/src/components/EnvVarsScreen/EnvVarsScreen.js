import React from 'react';
import { View, Text } from 'react-native';
import {
  SERVICE_PROTOCOL,
  SERVICE_HOST,
  SERVICE_BASE_PATH,
  SERVICE_PORT,
  APPLE_STORE_ID,
  PLAY_STORE_ID,
  GA_TRACKING_ID,
  SENTRY_CONFIG,
} from 'react-native-dotenv';

const EnvVarsScreen = () => (
  <View>
    <Text>
      <Text>SERVICE_PROTOCOL:</Text>
      <Text> {SERVICE_PROTOCOL}</Text>
    </Text>
    <Text>
      <Text>SERVICE_HOST:</Text>
      <Text> {SERVICE_HOST}</Text>
    </Text>
    <Text>
      <Text>SERVICE_BASE_PATH:</Text>
      <Text> {SERVICE_BASE_PATH}</Text>
    </Text>
    <Text>
      <Text>SERVICE_PORT:</Text>
      <Text> {SERVICE_PORT}</Text>
    </Text>
    <Text>
      <Text>APPLE_STORE_ID:</Text>
      <Text> {APPLE_STORE_ID}</Text>
    </Text>
    <Text>
      <Text>PLAY_STORE_ID:</Text>
      <Text> {PLAY_STORE_ID}</Text>
    </Text>
    <Text>
      <Text>GA_TRACKING_ID:</Text>
      <Text> {GA_TRACKING_ID}</Text>
    </Text>
    <Text>
      <Text>SENTRY_CONFIG:</Text>
      <Text> {SENTRY_CONFIG}</Text>
    </Text>
  </View>
);

EnvVarsScreen.navigationOptions = {
  title: 'Env. Variables',
};

export default EnvVarsScreen;
