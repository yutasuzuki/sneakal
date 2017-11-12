import React, { Component } from 'react';
import { 
  Text, 
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import style from '../styles';

class Editor extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View style={style.base.container}>
        <View style={style.header.container}>
          <View style={style.header.offset}></View>
          <View style={style.header.inner}>
            <TouchableHighlight
              underlayColor='#efb7bc'
              style={style.header.prev}
              onPress={Actions.pop}
            >
              <Icon name={'chevron-left'} size={20} color="#f12f40" />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#f6f6f6'
              style={style.header.timer}
            >
              <Text>Edit</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={style.editor.container}>
          <View style={style.editor.titleContainer}>
            <TextInput
              style={style.editor.title}
              placeholder='TITLE'
              multiline={true}
              editable={true}
            />
          </View>
          <View style={style.editor.textContainer}>
            <TextInput
              style={style.editor.text}
              placeholder='Awesome Speech...'
              multiline={true}
              editable={true}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Editor;
