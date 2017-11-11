import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const header = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, .97)',
  },
  offset: {
    height: getStatusBarHeight(),
  },
  inner: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prev: {
    position: 'absolute',
    left: 8,
    padding: 12,
    borderRadius: 4,
  },
  player: {
    position: 'absolute',
    right: 8,
    padding: 12,
    borderRadius: 4,
  },
});

export default header;