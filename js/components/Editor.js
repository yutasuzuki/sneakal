import React, { Component } from 'react';
import { 
  Text, 
  View,
  ScrollView,
  TextInput,
  Picker,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import SpeechModel from '../models/speech.model';
import style from '../styles';

export function random(min = 0, max = 100) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

class Editor extends Component {
  constructor (props) {
    super(props);
    console.log('Editor');
    const id = props.navigation.state.params.id;

    this.state = {
      id: null,
      title: '',
      text: '',
      settingModal: false,
    }

    if (id) {
      SpeechModel.getItem(id).then((response) => {
        const res = response[0];
        this.setState({
          id: res.id,
          title: res.title,
          text: res.text,
        });
      });
    }
  }

  async onSaveHandler() {
    if (!this.state.title) return;
    if (this.state.id) {
      await SpeechModel.updateItem(this.state);
    } else {
      await SpeechModel.createItem(this.state);
    }
    Actions.pop();
    const id = random();
    Actions.refresh({id});
  }

  pop() {
    Actions.pop();
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
              <Icon name={'chevron-left'} size={20} color={style.color.primary} />
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
        <ScrollView style={style.editor.container}>
          <View style={style.editor.titleContainer}>
            <TextInput
              style={style.editor.title}
              placeholder='TITLE'
              multiline={true}
              onChangeText={(title) => this.setState({title})}
              editable={true}
              value={this.state.title}
            />
          </View>
          <View style={style.editor.textContainer}>
            <TextInput
              style={style.editor.text}
              placeholder='Awesome Speech...'
              multiline={true}
              onChangeText={(text) => this.setState({text})}
              editable={true}
              value={this.state.text}
            />
          </View>
        </ScrollView>
        <TouchableHighlight 
          underlayColor='#efb7bc'
          onPress={() => this.refs.settingModal.open()}
          style={style.editor.btnSettingContainer}
        >
          <View style={style.editor.btnSetting}>
            <Text>
              <Icon name={'cog'} size={28} color={'#fff'} />
            </Text>
          </View>
        </TouchableHighlight>
        <Modal backdrop={false}  position={'top'} ref={'settingModal'}>
          <Text>Modal on top</Text>
          <View style={style.editor.pickerContainer}>
            <View style={style.editor.pickerColumn}>
              <Picker>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </View>
            <View style={style.editor.pickerColumn}>
              <Picker>
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default Editor;
