import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import moment from 'moment';

import {isEmpty} from '../common';
import Color from '../common/Color';

const Story = (item, index, onNavigate) => {
  const {by, descendants, kids, score, time, title, url} = item;
  const haveComments = !isEmpty(descendants) && descendants > 0;
  const canOpenURL = !isEmpty(url) && Linking.canOpenURL(url);
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.textGrey}>
        {isEmpty(index) ? ' ▲ ' : `${index + 1}. ▲ `}
      </Text>
      <View style={{width: '90%'}}>
        <TouchableOpacity
          disabled={!canOpenURL}
          onPress={() => Linking.openURL(url)}>
          <Text style={styles.textBlack}>
            {title}
            <Text style={styles.textDetails}>{` (${
              url?.split('/')[2]
            }) `}</Text>
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textDetails}>
            {`${score} points by ${by} ${moment(time * 1000).fromNow()}`}
          </Text>
          {haveComments && (
            <TouchableOpacity
              disabled={isEmpty(onNavigate)}
              onPress={() => onNavigate(kids, item)}>
              <Text style={styles.textDetails}>
                {' | ' + descendants + ' Comments'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  textBlack: {
    color: Color.Black,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: Color.White,
  },
  textGrey: {
    color: Color.Grey,
  },
  textDetails: {
    color: Color.Grey,
    fontSize: 12,
  },
});
