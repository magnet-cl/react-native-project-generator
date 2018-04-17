import React from 'react';
import { Platform } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default () => ((Platform.OS === 'ios') ? <KeyboardSpacer /> : null);
