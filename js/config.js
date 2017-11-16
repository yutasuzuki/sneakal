import Expo, { SQLite } from 'expo';
const db = SQLite.openDatabase({ name: 'sneakal.db' });

export { db }