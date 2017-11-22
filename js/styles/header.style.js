import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { color } from './setting.style';
import { Constants } from 'expo';

const header = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, .97)',
    paddingTop: Constants.statusBarHeight
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
  timer: {
    padding: 8,
    borderRadius: 4,
  },
  timerText: {
    fontFamily: "FiraCode-Retina",
    color: color.primary,
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
});

export default header;