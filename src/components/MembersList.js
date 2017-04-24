import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';
import { openURLIfCan } from '../global/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: scaleByVertical(17)
  },
  foto: {
    width: scale(127)
  },
  info: {
    flex: 1,
    paddingLeft: scale(18),
    paddingTop: scaleByVertical(11)
  },
  name: {
    color: colors.black,
    fontSize: scale(16),
    lineHeight: 19,
    fontWeight: '500',
    marginBottom: scale(6)
  },
  position: {
    color: colors.black,
    fontSize: scale(14),
    lineHeight: 18,
    fontStyle: 'italic',
  },
  email: {
    fontSize: scale(14),
    textDecorationLine: 'underline',
    color: colors.flatBlue,
    marginTop: scaleByVertical(11)
  }
});

export default function MembersList(props) {
  const { photo, name, position, email, institute } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.foto}
        resizeMode={Image.resizeMode.contain}
        source={photo}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
        <Text style={styles.position}>{institute}</Text>
        <Text
          style={styles.email}
          onPress={() => { openURLIfCan(`mailto:${email}`); }}
        >
          {email}
        </Text>
      </View>
    </View>
  );
}

MembersList.propTypes = {
  photo: Image.propTypes.source.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  institute: PropTypes.string.isRequired
};
