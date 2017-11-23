import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { color } from './setting.style';

const base = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45 + Constants.statusBarHeight,
    paddingRight: 24,
    paddingLeft: 24,
  },
  titleContainer: {
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d5d5d5',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
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
  },
  btnSettingContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    width: 66,
    height: 66,
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSetting: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: color.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pickerColumn: {
    flex: 1,
  }
});

export default base;
