import React, { Component } from 'react';
import { 
  Text, 
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import SpeechModel from '../models/speech.model';
import style from '../styles';

export function random(min = 0, max = 100) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

class Editor extends Component {
  constructor (props) {
    console.log('Editor');
    super(props);
    this.state = {
      title: '',
      text: '',
      created: null,
      updated: null,
      deleted: null
    }
  }

  onSaveHandler() {
    if (!this.state.title) return;
    SpeechModel.createItem(this.state).then(() => {
      console.log('onSaveHandler');
      Actions.pop();
      const id = random();
      Actions.refresh({name: id});
    });
  }

  pop() {
    SpeechModel.getItem(1).then((res) => {
      console.log('res', res);
      Actions.pop();
    });
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
              onPress={this.pop.bind(this)}
            >
              <Icon name={'chevron-left'} size={20} color="#f12f40" />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#f6f6f6'
              style={style.header.timer}
            >
              <Text>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#efb7bc'
              style={style.header.player}
              onPress={this.onSaveHandler.bind(this)}
            >
              <Text>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={style.editor.container}>
          <View style={style.editor.titleContainer}>
            <TextInput
              style={style.editor.title}
              placeholder='TITLE'
              multiline={true}
              onChangeText={(title) => this.setState({title})}
              editable={true}
            />
          </View>
          <View style={style.editor.textContainer}>
            <TextInput
              style={style.editor.text}
              placeholder='Awesome Speech...'
              multiline={true}
              onChangeText={(text) => this.setState({text})}
              editable={true}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Editor;
