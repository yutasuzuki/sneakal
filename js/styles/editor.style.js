import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const base = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45 + getStatusBarHeight(),
    paddingRight: 24,
    paddingLeft: 24,
  },
  titleContainer: {
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d5d5d5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textContainer: {
    marginTop: 12,
  },
  text: {
    fontSize: 16,
  }
});

export default base;
