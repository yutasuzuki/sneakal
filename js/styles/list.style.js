import { StyleSheet } from 'react-native';

const list = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 30
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fff',
    justifyContent: 'center',
		height: 100,
	},
	behindContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 15,
		backgroundColor: '#f3f3f3',
	},
	backBehide: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: 75
	},
	btnSetting: {
		backgroundColor: 'blue',
		right: 75
	},
	btnDelete: {
		backgroundColor: 'red',
		right: 0
	},
	item: {
		flex: 1,
		flexDirection: 'row',
  },
  posted: {
		flex: 2,
    paddingTop: 18,
    paddingBottom: 20,
		alignItems: 'center',
  },
  textPosted: {
    fontSize: 12,
    color: '#adadad',
  },
  context: {
		flex: 15,
    paddingTop: 18,
    paddingBottom: 20,
		borderBottomColor: '#dfdfdf',
		borderBottomWidth: 1,
  },
  header: {

  },
  textTitle: {

  },
  body: {

  },
  textParagrph: {

  }
});

export default list;