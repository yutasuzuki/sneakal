import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import Slide from './js/components/Slide';
import List from './js/components/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path='/' component={List}/>
          <Route path='/slide' component={Slide}/>
        </View>
      </NativeRouter>		
    );
  }
}
