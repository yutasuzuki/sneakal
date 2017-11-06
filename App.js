import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
} from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';
import Slide from './js/components/Slide';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Slide />
      </View>
    );
  }
}
