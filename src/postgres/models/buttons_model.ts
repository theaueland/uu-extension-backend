import * as db from '../../postgres/utils';
import { Buttons_test, Test } from '../../postgres/interfaces';

const valid_buttons_type_test = (data: Test): boolean => {
  if (data.id === undefined) { return false; }
  if(data.name === undefined) { return false; }
  return true;
}

const valid_buttons_type = (data: Buttons_test): boolean => {
  if (data.htmlString === undefined) { return false; }
  if (data.correctText === undefined) { return false; }
  if (data.name === undefined) { return false; }
  if (data.comment === undefined) { return false; }
  if (data.checked === undefined) { return false; }
  if (data.url === undefined) { return false; }
  if (data.testID === undefined) { return false; }
  if (data.chromeVersion === undefined) { return false; }
  if (data.chromeExtensionVersion === undefined) { return false; }
  if (data.testID === undefined) { return false; }
  if (data.outcome === undefined) { return false; }
  return true;
}

export const get_sql_query = (query_type: string, data?: string) => {
  const get_json = 'SELECT * FROM buttons_test WHERE id=${0};';
  const get_all_json = 'SELECT * FROM buttons_test';
  const post_json = `INSERT INTO buttons_test
                     VALUES(DEFAULT, '${JSON.stringify(data)}');`;
  const delete_all_json = 'DELETE FROM buttons_test';

  switch (query_type){
    case 'get': { return get_json; }
    case 'get_all': { return get_all_json; }
    case 'post': { return post_json; }
    case 'delete': { return delete_all_json; }
    default: {  
      throw new Error('query type not defined');
    }
  }
}

export const post_json = async(data: Test) => {
  //if (!valid_buttons_type(data)) { throw new Error('invalid json format'); }
  
  //let object_data: Test = data;
  //if (!valid_buttons_type_test(object_data)) { throw new Error('invalid json format'); }
  console.log('data.name: ', data.name);
  await db.query(get_sql_query('post', JSON.stringify(data)));
}

export const get_json = async() => {
  await db.query(get_sql_query('get'));
}
export const delete_json = async() => {
  await db.query(get_sql_query('delete'));
}
