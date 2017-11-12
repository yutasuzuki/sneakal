import React, { Component } from 'react';
import {
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
import { Actions } from 'react-native-router-flux';
import Markdown from './Markdown';
import style from '../styles';

const { width } = Dimensions.get('window');

const text = `
# 自己紹介とテーマ

それではスピーチを始めます。

## 自己紹介

* 引越し侍の鈴木ゆうたです。
* フロントエンドとデザインのアシマネをしています。
* ３２才で独身です。

## 今回のテーマ

* 「仕事をする上で大切にしていること」

---
# 仕事をする上で大切にしていること

## 前提
* サービスを運営として
* 会社員として
* 個人として

今回は「個人」として話をします。

## 個人として大切にしている事

* 楽しむこと
* クリエイティブであること

---
# 楽しむこと

* 自分にとって仕事は「遊びの延長」。
* 毎日8時間以上拘束されていて、人生の大半を過ごす環境が楽しくないっていう状況を想像するだけでも辛い。

## どういう時に楽しいか？

* コードを考えているとき。
* 新しい取り組みを実施するとき。
* そして少しずつ新しく始めた事が改善されていくとき。（組織やサービス）
* メンバーの成長を感じられるとき。

要するに「主体的に動いている時」が楽しい。

---
# 主体的に取り組む為のマインド

* 環境に合わせて働くのではなく、環境を変化させながら、自分も変化しながら働く。
* 会社の役職は、役割と考える。えらいとか上とか下とかではなく「フラットな言葉」で喋る。敬語を使わないとかではありません。

---

---

`;


class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <ScrollView>
        <View style={style.slide.container} >
          <Markdown styles={style.markdown} text={this.props.text} />
        </View>
      </ScrollView>
    )
  }
}

function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
}

class Slide extends Component {
  constructor(props) {
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

  componentWillUnmount() {
    this.stopTimer();
  }

  async preload() {
    const fontAssets = cacheFonts([
      // 'FiraCode-Bold': require('./assets/fonts/FiraCode-Bold.ttf'),
      // 'FiraCode-Light': require('./assets/fonts/FiraCode-Light.ttf'),
      // 'FiraCode-Medium': require('./assets/fonts/FiraCode-Medium.ttf'),
      // 'FiraCode-Regular': require('./assets/fonts/FiraCode-Regular.ttf'),
      { 'FiraCode-Retina': require('../../assets/fonts/FiraCode-Retina.ttf') },
      { 'AvenirNext': require('../../assets/fonts/AvenirNext.otf') },
    ]);
    await Promise.all([...fontAssets]);

    this.setState({ preload: true });
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
        color: this.state.total < value ? '#f12f40' : '#efefef',
      };
      return (
        <View key={index} style={style.header.timeLimitItem}>
          <Text style={sytle}>{minites}:{seconds.toString().length === 1 ? `0${seconds}` : seconds}</Text>
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
              underlayColor='#efb7bc'
              style={style.header.timer}
              onLongPress={this.onResetPlayerHandler.bind(this)}
              onPress={this.onShowTimeLimitHandler.bind(this)}
            >
              <Text style={style.header.timerText}>
                {this.state.minites}:{this.state.seconds.toString().length === 1 ? `0${this.state.seconds}` : this.state.seconds}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#efb7bc'
              style={style.header.player}
              onPress={this.onSwitchPlayerHandler.bind(this)}
            >
              <Icon name={this.state.player ? 'pause' : 'play'} size={20} color="#f12f40" />
            </TouchableHighlight>
          </View>
          <View style={style.header.timeLimits}>
            {this.showNotificationTimes()}
          </View>
        </View>
        <Swiper
          showsButtons={false}
          dot={<View style={{ backgroundColor: 'rgba(150, 150, 150, .1)', top: 0, width: (width - 16) / this.state.texts.length, height: 1 }} />}
          activeDot={<View style={{ backgroundColor: 'rgba(241, 47, 64, 1)', width: (width - 16) / this.state.texts.length, height: 1 }} />}
          paginationStyle={{ bottom: 20 }}
          loop={false}
        >
          {this.state.texts.map((text, index) => <SwipeView text={text} key={index} />)}
        </Swiper>
      </View>
    )
  }
}

export default Slide;
