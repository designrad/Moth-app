import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    paddingTop: scaleByVertical(12),
    paddingRight: scale(4),
    fontSize: scale(13)
  },
  noText: {
    paddingTop: scaleByVertical(12),
    fontSize: scale(13),
    color: colors.flatBlue,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
});

export default function CommentButton(props) {
  const { text, onPress } = props;
  if (!text) {
    return (
      <Text
        onPress={onPress}
        style={styles.noText}
      >
        {'Add comments (optional)'.localized}
      </Text>
    );
  }
  let newText;
  if (text.length > 35) {
    newText = `${text.substr(0, 35)}...`;
  } else {
    newText = text;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{newText.localized}</Text>
      <Text
        style={styles.noText}
        onPress={onPress}
      >
        {'Edit'.localized}
      </Text>
    </View>
  );
}

CommentButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

CommentButton.defaultProps = {
  text: null
};
