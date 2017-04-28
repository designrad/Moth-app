import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import { Moment } from '../global/utils';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    height: scaleByVertical(50),
    width: scale(400),
    paddingRight: scale(15),
    borderBottomWidth: scale(0.5),
    borderColor: colors.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerLeft: {
    paddingTop: scaleByVertical(6),
    flexDirection: 'row'
  },
  icon: {
    fontSize: scale(36),
    color: colors.flatRed
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
    color: colors.gray
  },
  arrow: {
    color: colors.arrowGray,
    fontSize: scale(36)
  },
  border: {
    marginBottom: scaleByVertical(15),
    borderBottomWidth: 0
  }
});

export default function DisclosureButton(props) {
  const { onPress, status, comment, date, last } = props;
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
  switch (status) {
    case 'other':
      styleStatus = {
        text: {},
        icon: 'cloud-upload',
        colorIcon: { color: colors.flatBlue }
      };
      break;
    case 'correct':
      styleStatus = {
        text: {},
        icon: 'check-circle',
        colorIcon: { color: colors.flatGreen }
      };
      break;
    case 'uncertain':
      styleStatus = {
        text: {},
        icon: 'cloud-upload',
        colorIcon: { color: colors.mainOrange }
      };
      break;
    case 'delete':
      styleStatus = {
        text: { color: colors.flatRed },
        icon: 'cloud-upload',
        colorIcon: { color: colors.flatRed }
      };
      break;
    default:
      styleStatus = {
        text: {},
        icon: 'cloud-upload'
      };
  }
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={[styles.container, last && styles.border]}>
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
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string,
  last: PropTypes.bool.isRequired
};

DisclosureButton.defaultProps = {
  comment: ''
};
