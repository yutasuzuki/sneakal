import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Link } from 'react-router-native';

class List extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Link to='/slide' style={{margin: 50}}>
          <Text>List</Text>
        </Link>
      </View>
    )
  }
}

export default List;
