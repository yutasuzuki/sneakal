import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const slide = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 88 + getStatusBarHeight(),
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 48,
    backgroundColor: '#fff',
  }
});

export default slide;
