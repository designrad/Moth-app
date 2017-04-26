import React, { PropTypes } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center'
  }
});

/**
 * @param {object} props of component.
 * @return {null} if not visible.
 */
export default function OverlayActivityIndicator(props) {
  const { visible } = props;
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}

OverlayActivityIndicator.propTypes = {
  visible: PropTypes.bool
};

OverlayActivityIndicator.defaultProps = {
  visible: true
};
