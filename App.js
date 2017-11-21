import React, { Component } from 'react';
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
import Main from './js/components/Main';
import Editor from './js/components/Editor';

class Route extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene hideNavBar={true} key='main' component={Main} initial/>
          <Scene hideNavBar={true} key='slide' component={Slide} />
          <Scene hideNavBar={true} key='editor' component={Editor} />
        </Scene>
      </Router>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Route />
    );
  }
}


