import { db } from '../config';

class SpeechModel {
  constructor() {}

  createTable() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `create table if not exists items (
            id integer primary key not null, 
            title text,
            text text,
            timer1 integer,
            timer2 integer,
            timer3 integer,
            created TIMESTAMP DEFAULT (DATETIME('now','localtime')),
            updated TIMESTAMP DEFAULT (DATETIME('now','localtime')),
            deleted text
          );`
        );
        resolve();
      });
    })
  }

  dropTable() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('drop table items;');
        resolve();
      });
    })
  }

  getItemList() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`select * from items where deleted IS NULL;`, [null], (_, { rows: { _array } }) =>  {
          console.log(_array);
          resolve(_array);
        });
      });
    })
  }

  getItem(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`select * from items where id = ?;`, [id], (_, { rows: { _array } }) =>  {
          resolve(_array);
        });
      });
    })
  }

  deleteItem(id) {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(`update items set deleted = DATETIME('now','localtime') where id = ?;`, [id], (_, val) => {
            resolve();
          });
        },
        null
      );
    })
  }

  createItem(state) {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql('insert into items (title, text) values (?, ?)', [state.title, state.text], (_, val) => {});
          tx.executeSql('select * from items', [], (_, { rows }) => {
            console.log(rows);
            resolve(rows);
          });
        },
        null
      );
    })
  }

  updateItem(state) {
    console.log(state);
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => { //UPDATE table SET datecol=date('now')
          tx.executeSql(`update items set updated = DATETIME('now','localtime'), title = ?, text = ? where id = ?;`, [state.title, state.text, state.id]);
          tx.executeSql('select * from items', [], (_, { rows }) => {
            resolve(rows);
          });
        },
        null
      );
    })
  }
}

export default new SpeechModel;
