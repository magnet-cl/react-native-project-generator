import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { View, ActivityIndicator } from 'react-native';

const styles = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const LoadingModal = ({ isVisible, ...props }) => (
  <Modal isVisible={isVisible} {...props}>
    <View style={styles}>
      <ActivityIndicator size="large" animating />
    </View>
  </Modal>
);


LoadingModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default LoadingModal;
