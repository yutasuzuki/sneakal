import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const slide = StyleSheet.create({
  header: {
    position: 'absolute',
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

export default slide;
