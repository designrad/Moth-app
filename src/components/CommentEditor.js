import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { scale, scaleByVertical, screenHeight, screenWidth } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    paddingTop: screenHeight / 4
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(5),
    paddingVertical: scale(5),
    borderRadius: scale(8)
  },
  input: {
    height: scaleByVertical(139),
    width: scale(295)
  }
});

export default function CommentEditor(props) {
  const { show, close } = props;
  return (
    <Modal
      onRequestClose={() => {}}
      animationType={'fade'}
      visible={show}
      transparent
    >
      <TouchableOpacity onPress={close}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus
              multiline
              style={styles.input}
              onEndEditing={close}
              underlineColorAndroid={colors.transparent}
              {...props}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

CommentEditor.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
