import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ListView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';

const style = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
  }
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: []
    }
  }

  componentDidMount() {
    this.setState({
      listItem: [1,2,3,4,5],
    })
  }

  render() {
    //  onPress={Actions.slide}
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (!this.state.listItem.length) {
      return <Text>Loading</Text>
    }
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <SwipeListView
            dataSource={ds.cloneWithRows(this.state.listItem)}
            renderRow={ data => (
              <TouchableHighlight
                onPress={Actions.slide}
                style={styles.rowFront}
                underlayColor={'#efb7bc'}
              >
                <View style={styles.listItem}>
                  <View style={styles.listPosted}>
                    <Text style={styles.textListPosted}>{data}h</Text>
                  </View>
                  <View style={styles.listContext}>
                    <View style={styles.listHeader}>
                      <Text style={styles.textListTitle}>I am {data} in a SwipeListView</Text>
                    </View>
                    <View style={styles.listbody}>
                      <Text style={styles.textlistParagrph}>I am {data} in a SwipeListView</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            )}
            renderHiddenRow={ (data, secId, rowId, rowMap) => (
              <View style={styles.rowBack}>
                <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                  <Text style={styles.backTextWhite}>Right</Text>
                </View>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
                  <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            rightOpenValue={-150}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	backTextWhite: {
		color: '#fff'
	},
	rowFront: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fff',
    justifyContent: 'center',
		height: 100,
	},
	rowBack: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 15,
		backgroundColor: '#DDD',
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	list: {
		flex: 1,
		marginBottom: 30
	},
	listItem: {
		flex: 1,
		flexDirection: 'row',
  },
  listPosted: {
		flex: 2,
    paddingTop: 18,
    paddingBottom: 20,
		alignItems: 'center',
  },
  textListPosted: {
    fontSize: 12,
    color: '#adadad',
  },
  listContext: {
		flex: 15,
    paddingTop: 18,
    paddingBottom: 20,
		borderBottomColor: '#dfdfdf',
		borderBottomWidth: 1,
  },
  listHeader: {

  },
  textListTitle: {

  },
  listbody: {

  },
  textlistParagrph: {

  }
});

export default List;
