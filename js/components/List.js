import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ListView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { db } from '../config';
import style from '../styles';


class List extends Component {
  constructor(props) {
    super(props);
    console.log('list1');
    this.state = {
      listItem: []
    }
  }

  componentDidMount() {
    console.log('list2');
    db.transaction(tx => {
      console.log(tx);
      tx.executeSql(
        `create table if not exists items (
          id integer primary key not null, 
          done int, 
          value text
        );`
      );
    });
    db.transaction(tx => {
      tx.executeSql(`select * from items where done = ?;`, [this.props.done ? 1 : 0], (_, { rows: { _array } }) =>  {
        console.log(_array);
        this.setState({
          listItem: _array,
        })
        this.setState({ items: _array })
      });
    });
  }

  deleteItem(id) {
    console.log('delete id', id);
    db.transaction(tx => {
      console.log(tx);
      tx.executeSql(
        'drop table items;'
      );
    });
    this.setState({
      listItem: [],
    })
  }

  settingItem(id) {
    console.log('setting id', id);
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={style.base.container}>

        <View style={style.header.container}>
          <View style={style.header.offset}></View>
          <View style={style.header.inner}>
            <TouchableHighlight
              underlayColor='#f6f6f6'
              style={style.header.timer}
            >
              <Text>SNEAKALs</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#efb7bc'
              style={style.header.player}
              onPress={Actions.editor}
            >
              <Icon name={'pencil'} size={20} color="#f12f40" />
            </TouchableHighlight>
          </View>
        </View>

        <View style={style.list.container}>
          {(() => {
            if(!this.state.listItem.length) {
              return <Text>Loading</Text>
            } else {
              return (
                <SwipeListView
                  dataSource={ds.cloneWithRows(this.state.listItem)}
                  renderRow={ data => (
                    <TouchableHighlight
                      onPress={Actions.slide}
                      style={style.list.row}
                      underlayColor={'#f6f6f6'}
                    >
                      <View style={style.list.item}>
                        <View style={style.list.posted}>
                          <Text style={style.list.textPosted}>{data.id}h</Text>
                        </View>
                        <View style={style.list.context}>
                          <View style={style.list.header}>
                            <Text style={style.list.textTitle}>I am {data.id} in a SwipeListView</Text>
                          </View>
                          <View style={style.list.body}>
                            <Text style={style.list.textParagrph}>I am {data.id} in a SwipeListView</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )}
                  renderHiddenRow={(data, secId, rowId, rowMap) => (
                    <View style={style.list.behindContainer}>
                      <TouchableOpacity onPress={this.settingItem.bind(this, data.id)} style={[style.list.btnBehide, style.list.btnSetting]}>
                        <Text style={[style.text.white, style.text.bold]}>SETTING</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.deleteItem.bind(this, data.id)} style={[style.list.btnBehide, style.list.btnDelete]}>
                        <Text style={[style.text.white, style.text.bold]}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  disableRightSwipe={true}
                  rightOpenValue={-150}
                />
              )
            }
          })()}
        </View>
      </View>
    )
  }
}

export default List;
