import axios, { AxiosResponse } from 'axios';

const post_json = async() => {
  try {
    const res: AxiosResponse = await axios.post('http://localhost:8080/storage/save_buttons', {
      "json": "insert JSON data here"
    });

    console.log("(client: send_post) Response from post request: ", res.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response && e.response.data){
      console.log(e.response.data);
    }
  }
};

const post_user = async() => {
  try {
    const res: AxiosResponse = await axios.post('http://localhost:8080/storage/register_user', {
      "social_security_number": "123456789",
      "email": "delta.echo@foxtrot.net",
      "first_name": "delta",
      "last_name": "delta",
      "password": "password",
      "activation_code": "activation code"
    });

    console.log("(client: send_post) Response from post request: ", res.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response && e.response.data){
      console.log(e.response.data);
    }
  }
};

const get = async() => {
  try {
    const res: AxiosResponse = await axios.get('http://localhost:8080/storage/all_users');
    console.log("(client: send_get) Response from get request: ", res.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response && e.response.data){
      console.log(e.response.data);
    }
  }
};
// ----------------------------------------------------------------------------
const run_test = (run: string) => {
  switch (run){
    case 'post_json': { post_json(); break; }
    case 'post_user': { post_user(); break; }
    case 'get': { get(); break; }
    default: { return ""; }
  }
}

export { run_test };
