import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableHighlight,
  Dimensions 
} from 'react-native';
import Expo, { Font } from "expo";
import Swiper from 'react-native-swiper';
import { NativeRouter, Route, Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// class Router extends Component {
//   constructor (props) {
//     super(props)
//   }

//   render() {
//     return (
//       <NativeRouter>

//       </NativeRouter>
//     )
//   }
// }

const text = `
# ES6 modules
canary -> flags -> 
pathを書かないといけない

---
# fluent design system
* design systemは概念や原則がある
* light, depth, material, motion, scale
* 実例がまだ少ない
* documentあり
* inclusive design at microsoft

---
# 静的サイトジェネレーター
* harp 

---
# usability and a11y
* ISOで両者定義されている
* UC browser
* windowsのシェアをandroidが抜いている
* UI != UX
* UX == 主観的満足度
* 後方互換 -> IE
`;

function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
}

class SwipeView extends Component {
  constructor (props) {
    super(props);
    this.props = props;
  }
  
  componentWillMount() {
    this.setState({
      text: this.props.text
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.slide} >
          <Text style={styles.p}>aaaaaaa {this.state.text}</Text>
        </View>
      </ScrollView>
    )
  }
}

class Slide extends Component {
  constructor (props) {
    super(props);
    this.defaultState = {
      preload: false,
      seconds: 0,
      minites: 0,
      total: 0,
      player: false
    };
    this.state = Object.assign({}, this.defaultState);
    this.queue = null;
  }

  componentWillMount() {
    this.preload();
    this.setState({
      texts: text.split('---')
    });
  }

  async preload() {
    const fontAssets = cacheFonts([
      // 'FiraCode-Bold': require('./assets/fonts/FiraCode-Bold.ttf'),
      // 'FiraCode-Light': require('./assets/fonts/FiraCode-Light.ttf'),
      // 'FiraCode-Medium': require('./assets/fonts/FiraCode-Medium.ttf'),
      // 'FiraCode-Regular': require('./assets/fonts/FiraCode-Regular.ttf'),
      {'FiraCode-Retina': require('./assets/fonts/FiraCode-Retina.ttf')},
    ]);

    await Promise.all([
      ...fontAssets,
    ]);

    this.setState({preload: true});
  }

  onSwitchPlayerHandler() {
    const status = !this.state.player;
    this.setState({
      player: status
    });
    if (status) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  onResetPlayerHandler() {
    this.setState({
      seconds: 0,
      minites: 0,
      total: 0
    });
  }

  startTimer() {
    this.queue = setInterval(() => {
      const total = this.state.total + 1;
      const minites = Math.floor(total / 60);
      const seconds = Math.floor(total % 60);
      this.setState({
        seconds,
        minites,
        total
      });
    }, 1000);
  }
  
  stopTimer() {
    clearInterval(this.queue);
  }

  render() {
    let btnPlayer = <Icon name='play' size={18} color="#f12f40" />;

    if (!this.state.preload) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.swiper}>
        <View style={styles.headerOffset}></View>
        <View style={styles.header}>
          <TouchableHighlight 
            underlayColor='#efb7bc' 
            style={styles.timer} 
            onLongPress={this.onResetPlayerHandler.bind(this)}
          >
            <Text style={styles.timerText}>
              {this.state.minites}:{this.state.seconds.toString().length === 1 ? `0${this.state.seconds}`: this.state.seconds}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight 
            underlayColor='#efb7bc' 
            style={styles.player} 
            onPress={this.onSwitchPlayerHandler.bind(this)}
          >
            <Icon name={this.state.player? 'pause': 'play'} size={20} color="#f12f40" />
          </TouchableHighlight>
        </View>
        <Swiper
          showsButtons={false} 
          dot={<View style={{backgroundColor: 'rgba(241, 47, 64, .16)', top:0, width: width / this.state.texts.length, height: 2}} />}
          activeDot={<View style={{backgroundColor: 'rgba(241, 47, 64, 1)', width: width / this.state.texts.length, height: 2}} />}
          paginationStyle={{bottom: null}}
          loop={false}
        >
          {this.state.texts.map((text, index) => <SwipeView text={text} key={index} />)}
        </Swiper>
      </View>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Slide />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerOffset: {
    height: 20,
    backgroundColor: '#fff',
  },
  timer: {
    padding: 8,
    borderRadius: 4,
  },
  timerText: {
    fontFamily: "FiraCode-Retina",
    color: '#f12f40',
    fontSize: 24
  },
  player: {
    position:'absolute',
    right: 5,
    padding: 12,
    borderRadius: 4,
  },
  swiper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  p: {
    color: '#444',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
