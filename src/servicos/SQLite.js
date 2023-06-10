import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';



//enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'db.db', location: 'default' });
};
/*
export const createTable = async (db) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS Pecas (
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};*/


/*
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

function abreConexao() {
    const database = SQLite.openDatabase(
                                {
                                    name: 'db',
                                    location: 'default'
                                }, 
                                () => {}, 
                                (error) => console.log(error));
    return database;
}

export const db = abreConexao();
*/