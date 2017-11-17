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
            created text,
            updated text,
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
        tx.executeSql(`select * from items;`, [], (_, { rows: { _array } }) =>  {
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

  createItem(state) {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql('insert into items (title, text) values (?, ?)', [state.title, state.text], (_, val) => {});
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
