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
import DrawerContent from './DrawerContent';
import style from '../styles';
import List from './List';

class Main extends Component {
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
    this.drawer.open();
  }

  render() {
    return (
      <Drawer
        ref={(ref) => this.drawer = ref}
        content={<DrawerContent />}
        tapToClose={ true }
        openDrawerOffset={ 0.3 }
        panCloseMask={ 0.3 }
        closedDrawerOffset={ 0 }
        styles={ drawerStyles }
        tweenHandler={ ratio => {
            return {
              main: { 
                opacity: (2 - ratio )
              }
            }
          }
        }
      >
        <List 
          showDrawer={this.onShowDrawer.bind(this)}
        />
      </Drawer>
    )
  }
}

export default Main;

const drawerStyles = {
  drawer: {
    backgroundColor: '#252525',
  }
}
