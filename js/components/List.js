import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ListView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import style from '../styles';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: []
    }
  }

  componentDidMount() {
    this.setState({
      listItem: [1,2,3,4,5],
    })
  }

  render() {
    //  onPress={Actions.slide}
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (!this.state.listItem.length) {
      return <Text>Loading</Text>
    }
    return (
      <View style={style.base.container}>
        <View style={style.list.container}>
          <SwipeListView
            dataSource={ds.cloneWithRows(this.state.listItem)}
            renderRow={ data => (
              <TouchableHighlight
                onPress={Actions.slide}
                style={style.list.row}
                underlayColor={'#efb7bc'}
              >
                <View style={style.list.item}>
                  <View style={style.list.posted}>
                    <Text style={style.list.textPosted}>{data}h</Text>
                  </View>
                  <View style={style.list.context}>
                    <View style={style.list.header}>
                      <Text style={style.list.textTitle}>I am {data} in a SwipeListView</Text>
                    </View>
                    <View style={style.list.body}>
                      <Text style={style.list.textParagrph}>I am {data} in a SwipeListView</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            )}
            renderHiddenRow={ (data, secId, rowId, rowMap) => (
              <View style={style.list.behindContainer}>
                <View style={[style.list.backBehide, style.list.btnSetting]}>
                  <Text style={style.text.white}>Right</Text>
                </View>
                <TouchableOpacity style={[style.list.backBehide, style.list.btnDelete]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
                  <Text style={style.text.white}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            rightOpenValue={-150}
          />
        </View>
      </View>
    )
  }
}

export default List;
