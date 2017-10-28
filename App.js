import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  Dimensions 
} from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <Swiper style={styles.wrapper} 
        showsButtons={false} 
        dot={<View style={{backgroundColor: 'rgba(0, 0, 0, .2)', width: width / 3, height: 5}} />}
        activeDot={<View style={{backgroundColor: 'rgba(0, 0, 0, .4)', width: width / 3, height: 5}} />}
        loop={false}
      >
        <ScrollView>
          <View style={styles.slide1} >
            <Text style={styles.text}>
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
              Hello Swiper
            </Text>
          </View>
        </ScrollView>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  buttonText: {

  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
