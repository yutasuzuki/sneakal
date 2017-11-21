import { StyleSheet } from 'react-native';
import { color } from './setting.style';

const text = StyleSheet.create({
  white: {
    color: '#fff',
  },
  primary: {
    color: color.primary,
  },
  disabled: {
    color: color.disabled,
  },
  bold: {
		fontWeight: 'bold',
  }
});

export default text;
