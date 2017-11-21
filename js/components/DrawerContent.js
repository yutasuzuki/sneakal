import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer';
import style from '../styles';
import List from './List';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  onShowDrawer() {
    this._drawer.open();
  }

  render() {
    return (
      <View><Text>drawer</Text></View>
    )
  }
}

export default DrawerContent;
