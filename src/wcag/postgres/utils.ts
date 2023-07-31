import { initClient } from './initClient';

export const query = async(query: string) => {
  const dbClient = initClient();
  if (dbClient) {
    try {
      await dbClient.connect();
      await dbClient.query(query);
    }
    catch (error) { throw new Error('Failed to execute database query');}
    finally {
      await dbClient.end();
    }
  }
  else { console.log('failed to connect to database'); throw new Error('Failed to connect to database');}
}
