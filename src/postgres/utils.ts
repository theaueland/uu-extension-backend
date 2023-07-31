import { init_client } from './init_client';

export const sesond_query = async(query: string) => {
  const db_client = init_client();
  if (db_client) {
    try {
      db_client.connect().then ( async() => {
        console.log('connected?');
        await db_client.query(query);
      })
      .catch(err => { console.log('error: ', err); })
      //.catch(err => { throw new Error('failed to connect'); })
    }
    catch (error) { throw new Error('Failed to execute database query');}
    finally {
      await db_client.end();
    }
  }
  else { console.log('failed to connect to database'); throw new Error('Failed to connect to database');}
}
export const query = async(query: string) => {
  const db_client = init_client();
  if (db_client) {
    try {
      await db_client.connect();
      await db_client.query(query);
    }
    catch (error) { throw new Error('Failed to execute database query');}
    finally {
      await db_client.end();
    }
  }
  else { console.log('failed to connect to database'); throw new Error('Failed to connect to database');}
}
