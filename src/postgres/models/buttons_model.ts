
export const validate_json = (json: JSON): boolean => {
  console.log('json data: ', json);

  return true;
}

export const get_sql_query = (query_type: string, data: string) => {
  const get_json = 'SELECT * FROM buttons_test WHERE id=${0};'
  const get_all_json = 'SELECT * FROM buttons_test';
  const post_json = `INSERT INTO buttons_test
                     VALUES(DEFAULT, '${JSON.stringify(data)}');`;

  switch (query_type){
    case 'get': { return get_json; }
    case 'get_all': { return get_all_json; }
    case 'post': { return post_json; }
    default: {  
      throw new Error('query type not defined');
    }
  }
}
