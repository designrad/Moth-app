import React, { PropTypes } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: scale(5),
    borderWidth: scale(1),
    borderColor: colors.gray,
    paddingLeft: scale(11)
  },
  input: {
    fontSize: scale(14),
    width: scale(295),
    height: scaleByVertical(39)
  }
});

export default function Input(props) {
  const { placeholder, styleInput, type } = props;
  return (
    <View style={[styles.container, styleInput]}>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        multiline={false}
        placeholder={placeholder}
        maxLength={40}
        keyboardType={type}
        disableFullscreenUI={false}
        underlineColorAndroid={colors.transparent}
        {...props}
      />
    </View>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  styleInput: View.propTypes.style,
  type: PropTypes.string
};

Input.defaultProps = {
  styleInput: {},
  type: 'default'
};
