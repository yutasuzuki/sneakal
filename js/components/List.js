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
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import SpeechModel from '../models/speech.model';
import style from '../styles';


class List extends Component {
  constructor(props) {
    super(props);
    console.log('list1');
    this.state = {
      listItem: []
    }
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps!!');
    SpeechModel.getItemList().then((_array) => {
      console.log(_array);
      this.setState({
        listItem: _array,
      });
    });
  }

  componentWillMount() {
    SpeechModel.createTable().then(() => {
      console.log('componentWillMount!! createTable!!');
    });
  }

  componentDidMount() {
    SpeechModel.getItemList().then((_array) => {
      this.setState({
        listItem: _array,
      });
    });
  }

  deleteItem(id, rowMap, secId, rowId) {
    rowMap[`${secId}${rowId}`].closeRow();
    console.log('delete id', id);

    if (id === 1) {
      SpeechModel.dropTable()
        .then(() => {
          return SpeechModel.createTable();
        }).then(() => {
          this.setState({
            listItem: [],
          });
        });
    } else {
      SpeechModel.deleteItem(id)
        .then(() => {
          return SpeechModel.getItemList();
        }).then((_array) => {
          this.setState({
            listItem: _array,
          });
        })
    }
  }

  editItem(id, rowMap, secId, rowId) {
    rowMap[`${secId}${rowId}`].closeRow();
    console.log('edit id', id);
    Actions.editor({id});
  }

  onSlideHandler(data) {
    console.log(data);
    const id = data.id;
    console.log(id);
    Actions.slide({id});
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
              <Text>Parrot</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#efb7bc'
              style={style.header.player}
              onPress={Actions.editor}
            >
              <Icon name={'pencil'} size={20} color={style.color.primary} />
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
                      onPress={this.onSlideHandler.bind(this, data)}
                      style={style.list.row}
                      underlayColor={'#f6f6f6'}
                    >
                      <View style={style.list.item}>
                        <View style={style.list.posted}>
                          <Text style={style.list.textPosted}>{data.id}h</Text>
                        </View>
                        <View style={style.list.context}>
                          <View style={style.list.header}>
                            <Text style={style.list.textTitle}>{data.title}</Text>
                          </View>
                          <View style={style.list.body}>
                            <Text style={style.list.textParagrph}>{(() => {
                              const text = data.text.replace(/\r?\n/g, '');
                              return text.length < 40 ? text: text.slice(0, 40) + '...';
                            })()}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )}
                  renderHiddenRow={(data, secId, rowId, rowMap) => (
                    <View style={style.list.behindContainer}>
                      <TouchableOpacity onPress={this.editItem.bind(this, data.id, rowMap, secId, rowId)} style={[style.list.btnBehide, style.list.btnEdit]}>
                        <Text style={[style.text.white, style.text.bold]}>EDIT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.deleteItem.bind(this, data.id, rowMap, secId, rowId)} style={[style.list.btnBehide, style.list.btnDelete]}>
                        <Text style={[style.text.white, style.text.bold]}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  rightOpenValue={-75}
                  leftOpenValue={75}
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
