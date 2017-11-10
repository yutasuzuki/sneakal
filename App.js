import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
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
      <Router>
        <Scene key='root'>
          <Scene initial hideNavBar={true} key='list' component={List} />
          <Scene hideNavBar={true} key='slide' component={Slide} />
        </Scene>
      </Router>
    );
  }
}


