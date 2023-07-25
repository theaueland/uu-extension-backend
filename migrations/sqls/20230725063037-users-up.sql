CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  social_security_number VARCHAR ( 50 ) NOT NULL,
  email VARCHAR ( 255 ) NOT NULL,
  first_name VARCHAR ( 50 ) NOT NULL,
  last_name VARCHAR ( 50 ) NOT NULL,
  password VARCHAR ( 50 ) NOT NULL,
  activation_code VARCHAR ( 50 ) NOT NULL,
  created_on TIMESTAMP,
  last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS buttons_test (
  test_id serial PRIMARY KEY,
  test_result json NOT NULL
);

