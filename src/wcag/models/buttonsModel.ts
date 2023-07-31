import * as db from '../postgres/utils';
import { ButtonsTest, Test } from '../interfaces';

const validButtonsTypeTest = (data: Test): boolean => {
  if (data.id === undefined) { return false; }
  if(data.name === undefined) { return false; }
  return true;
}

const validButtonsType = (data: ButtonsTest): boolean => {
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

export const getSqlQuery = (query_type: string, data?: string) => {
  const getJson = 'SELECT * FROM buttons_test;';
  const getAllJson = 'SELECT * FROM buttons_test';
  const postJson = `INSERT INTO buttons_test
                     VALUES(DEFAULT, '${JSON.stringify(data)}');`;
  const deleteAllJson = 'DELETE FROM buttons_test';

  switch (query_type){
    case 'get': { return getJson; }
    case 'getAll': { return getAllJson; }
    case 'post': { return postJson; }
    case 'delete': { return deleteAllJson; }
    default: {  
      throw new Error('query type not defined');
    }
  }
}

export const postJson = async(data: Test) => {
  //if (!validButtonsType(data)) { throw new Error('invalid json format'); }
  //let object_data: Test = data;
  //if (!validButtonsTypeTest(object_data)) { throw new Error('invalid json format'); }
  
  await db.query(getSqlQuery('post', JSON.stringify(data)));
}

export const getJson = async() => {
  await db.query(getSqlQuery('get'));
}
export const deleteJson = async() => {
  await db.query(getSqlQuery('delete'));
}
