import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Color from '../common/Color';

export default function NetworkError() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Internet not reachable</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Color.Red,
  },
  label: {
    color: Color.White,
    fontSize: 16,
  },
});
