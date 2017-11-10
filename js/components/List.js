import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ margin: 20 }}>
        <Text onPress={Actions.slide}>List</Text>
      </View>
    )
  }
}

export default List;
