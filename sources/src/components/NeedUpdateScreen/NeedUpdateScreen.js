import React from 'react';
import { View, Text, Button } from 'react-native';
import AppLink from 'react-native-app-link';

import { APPLE_STORE_ID, PLAY_STORE_ID } from 'react-native-dotenv';

import styles from './styles';

NeedUpdateScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Application Update Needed</Text>
    <Button
      onPress={() => {
        AppLink.openInStore(APPLE_STORE_ID, PLAY_STORE_ID);
      }}
      title="Go to Store"
    />
  </View>
);

NeedUpdateScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};

export default NeedUpdateScreen;
