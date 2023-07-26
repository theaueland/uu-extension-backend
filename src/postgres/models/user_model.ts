interface User {
  user_id?: number,
  social_security_number: string,
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  activation_code: string,
  created_on?: Date,
  last_login?: Date
}

export const get_sql_query = (query_type: string, table: string) => {
  const social_security_number: string = 'social security number';
  const email: string = 'alpha.bravo@charlie.net';

  const select_query = 'SELECT * FROM ' + 'users' + ';';
  const post_user = `INSERT INTO ${table} VALUES(DEFAULT,
    '${social_security_number}', '${email}',
    'alpha', 'bravo', 'password', 'activation code');`;

  switch (query_type){
    case 'get': { return select_query; }
    case 'post_user': { return post_user; }
    default: {  
      throw new Error('query type not defined');
    }
  }
}
