import React, { Component } from 'react';
import { 
  StyleSheet, 
  Animated,
  Text, 
  View,
  ScrollView,
  TouchableHighlight,
  Vibration,
  Dimensions 
} from 'react-native';
import Expo from 'expo';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Markdown from './Markdown';

const { width } = Dimensions.get('window');

const MarkdownStyles = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#e5e5e5',
  },
  strong: {
    fontSize: 36,
  },
  p: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 16,
  },
  liDot: {
    width: 6,
    height: 6,
    backgroundColor: '#e5e5e5',
    borderRadius: 3,
    marginRight: 10,
    marginTop: 8,
  },
  li: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 12,
  },
}

const text = `
# 自己紹介とテーマ

それではスピーチを始めます。

## 自己紹介

* 引越し侍の鈴木ゆうたです。
* フロントエンドとデザインのアシマネをしています。
* ３２才で独身です。

## 今回のテーマ

* 「働く上で大切にしている事」

---
# 働く上で大切にしている事

働く上で大切にしている事の定義はいろいろある。

* 会社を中心として
* サービスとして
* 個人として

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

class TimeLimit extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
    }).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
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
      player: false,
      showTimeLimit: false,
      notificationTimes: [60, 120, 180]
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
      {'FiraCode-Retina': require('../../assets/fonts/FiraCode-Retina.ttf')},
      {'AvenirNext': require('../../assets/fonts/AvenirNext.otf')},
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

  onShowTimeLimitHandler() {
    this.showTimeLimit = !this.showTimeLimit;
  }

  showNotificationTimes() {
    return this.state.notificationTimes.map((value, index) => { 
      if (this.state.total === value) {
        Vibration.vibrate();
      }
      const minites = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      const sytle = {
        fontFamily: "FiraCode-Retina",
        fontSize: 12,
        color: this.state.total < value? '#f12f40': '#efefef',
      };
      return (
        <View key={index} style={styles.timeLimitItem}>
          <Text style={sytle}>{minites}:{seconds.toString().length === 1 ? `0${seconds}`: seconds}</Text>
        </View>
      );
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
        <View style={styles.header}>
          <View style={styles.headerOffset}></View>
          <View style={styles.headerInner}>
            <TouchableHighlight 
              underlayColor='#efb7bc' 
              style={styles.chevronLeft} 
              onPress={this.onSwitchPlayerHandler.bind(this)}
            >
              <Icon name={'chevron-left'} size={20} color="#f12f40" />
            </TouchableHighlight>
            <TouchableHighlight 
              underlayColor='#efb7bc' 
              style={styles.timer} 
              onLongPress={this.onResetPlayerHandler.bind(this)}
              onPress={this.onShowTimeLimitHandler.bind(this)}
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
          <View style={styles.timeLimits}>
            {this.showNotificationTimes()}
          </View>
        </View>
        <Swiper
          showsButtons={false} 
          dot={<View style={{backgroundColor: 'rgba(150, 150, 150, .1)', top:0, width: (width - 16) / this.state.texts.length, height: 1}} />}
          activeDot={<View style={{backgroundColor: 'rgba(241, 47, 64, 1)', width: (width - 16) / this.state.texts.length, height: 1}} />}
          paginationStyle={{bottom: 20}}
          loop={false}
        >
          {this.state.texts.map((text, index) => <SwipeView text={text} key={index} />)}
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, .97)',
  },
  headerOffset: {
    height: getStatusBarHeight(),
  },
  headerInner: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  timeLimits: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  timeLimitItem: {
    marginRight: 8,
    marginLeft: 8,
  },
  chevronLeft: {
    position:'absolute',
    left: 8,
    padding: 12,
    borderRadius: 4,
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
    paddingTop: 88 + getStatusBarHeight(),
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

export default Slide;
