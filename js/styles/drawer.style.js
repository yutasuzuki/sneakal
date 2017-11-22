import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

const drawer = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    color: '#fff',
  },
  header: {
    color: '#fff',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    color: '#353535',
    fontSize: 16,
  },
  list: {
    color: '#fff',
  },
});

export default drawer;
