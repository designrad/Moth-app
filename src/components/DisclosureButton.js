import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import { Moment } from '../global/utils';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    height: scaleByVertical(50),
    flex: 1,
    borderBottomWidth: scale(0.5),
    borderColor: colors.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: scale(15),
  },
  containerLeft: {
    paddingTop: scaleByVertical(6),
    flexDirection: 'row'
  },
  icon: {
    fontSize: scale(36),
    color: colors.flatRed,
    backgroundColor: 'transparent',
  },
  textContainer: {
    paddingLeft: scale(14)
  },
  textDate: {
    color: colors.black,
    fontSize: scale(17)
  },
  textComment: {
    fontSize: scale(12),
    color: colors.gray,
    backgroundColor: 'transparent',
  },
  arrow: {
    color: colors.arrowGray,
    fontSize: scale(36),
    marginRight: scale(15),
  },
  border: {
    marginBottom: scaleByVertical(15),
    borderBottomWidth: 0
  }
});

export default function DisclosureButton(props) {
  const { onPress, status, comment, date } = props;
  let newText;

  if (comment.length > 35) {
    newText = `${comment.substr(0, 35)}...`;
  } else {
    newText = comment;
  }

  let styleStatus = {
    text: {},
    icon: 'cloud-upload',
    colorIcon: {}
  };

  if (status) {
    styleStatus = {
      text: {},
      icon: 'check-circle',
      colorIcon: { color: colors.flatGreen }
    };
  } else {
    styleStatus = {
      text: { color: colors.flatRed },
      icon: 'cloud-upload',
      colorIcon: { color: colors.flatRed }
    };
  }

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <AIcon name={styleStatus.icon} style={[styles.icon, styleStatus.colorIcon]} />
          <View style={styles.textContainer}>
            <Text style={[styles.textDate, styleStatus.text]}>{Moment(date).format('lll')}</Text>
            <Text numberOfLines={1} style={[styles.textComment, styleStatus.text]}>{newText}</Text>
          </View>
        </View>
        <AIcon name={'angle-right'} style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
}

DisclosureButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  status: PropTypes.string,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string,
};

DisclosureButton.defaultProps = {
  comment: '',
  status: ''
};
