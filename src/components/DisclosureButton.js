import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    height: scaleByVertical(50),
    width: scale(400),
    borderBottomWidth: scale(0.5),
    borderColor: colors.borderGray,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  icon: {
    fontSize: scale(36),
    color: colors.flatRed
  }
});

export default function DisclosureButton(props) {
  const { onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.container}>
        <AIcon name={'cloud-upload'} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

DisclosureButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
