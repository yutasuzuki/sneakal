import React, { Component, createElement } from 'react';
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
import marked from 'marked';

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
- canary -> flags -> 
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
*ISOで両者定義されている*fsdfsd
* UC browser
* windowsのシェアをandroidが抜いている
* UI != UX
* UX == 主観的満足度
* 後方互換 -> IE

---
# 静的サイトジェネレーター
* harp 

---
# fluent design system
* design systemは概念や原則がある
* light, depth, material, motion, scale
* 実例がまだ少ない
* documentあり
* inclusive design at microsoft

`;

const MarkdownStyles = {
  h1: {
    fontSize: 24,
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },
  strong: {
    fontSize: 36,
  },
  p: {
    fontSize: 16,
    lineHeight:20,
  },
  li: {
    fontSize: 16,
    lineHeight:40,
  },
}

class Markdown extends Component {
  constructor (props) {
    super(props);
    this.props = props;
    this.inlineStyleList = [
      'color',
      'fontFamily',
      'fontSize',
      'fontStyle',
      'fontWeight',
      'lineHeight',
      'textAlign',
      'textDecorationLine',
      'textShadowColor',
      'textShadowOffset',
      'textShadowRadius',
      'textAlignVertical',
      'fontVariant',
      'letterSpacing',
      'textDecorationColor',
      'textDecorationStyle',
      'writingDirection'
    ];
  }

  convertMarkdown() {
    const elements = [];
    const block = marked(this.props.text);
    const contexts = block.split('\n');
     contexts.forEach((value, index) => {
      if (value.match(/<([^>]+)>/g)) {
        const tagContext = value.match(/<([^>]+)>/g)[0];
        const tagInner = tagContext.match(/<(.*|)>/)[1];
        const tag = tagInner.split(' ')[0].indexOf('/') === -1 ? tagInner.split(' ')[0]: 'p';
        const text = value.replace(/<\/?[^>]+>/g, '');
        const styles = this.getStyles(this.props.styles[tag]);
        if (text) {
          elements.push(
            <View key={index} style={styles.block}>
              <Text style={styles.inline}>{text}</Text>
            </View>
          );
        }
      }
    });
    return elements;
  }

  getStyles(style) {
    const styles = {
      inline: {},
      block: {}
    };
    for(const key in style) {
      if (this.inlineStyleList.includes(key)) {
        styles.inline[key] = style[key];
      } else {
        styles.block[key] = style[key];
      }
    }
    return styles;
  }

  render() {
    return (
      <View>
        {this.convertMarkdown().map(v => v)}
      </View>
    )
  }
}

class SwipeView extends Component {
  constructor (props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.slide} >
          <Markdown styles={MarkdownStyles} text={this.props.text} />
        </View>
      </ScrollView>
    )
  }
}


function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
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
      texts: text.split('---\n')
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
    await Promise.all([...fontAssets]);

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
          dot={<View style={{backgroundColor: 'rgba(241, 241, 241, 1)', top:0, width: (width - 16) / this.state.texts.length, height: 1}} />}
          activeDot={<View style={{backgroundColor: 'rgba(241, 47, 64, 1)', width: (width - 16) / this.state.texts.length, height: 1}} />}
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
    right: 8,
    padding: 12,
    borderRadius: 4,
  },
  swiper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 48,
    backgroundColor: '#fff',
  },
  paragraph: {
    lineHeight: 18,
    color: '#444',
  },
  p: {
    color: '#444',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
