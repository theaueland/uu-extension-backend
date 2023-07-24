import axios, { AxiosResponse } from 'axios';

import { init_database } from '../postgres/init_client';

const post = async() => {
  try {
    const res: AxiosResponse = await axios.post('http://localhost:8080/storage/save_buttons', {
      data: "insert JSON data here"
    });

    console.log("(client: send_post) Response from post request: ", res.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)){
      if (e.response && e.response.data) {
        console.log(e.response.data);
      }
    }
  }
};

const get = async() => {
  const res: AxiosResponse = await axios.get('http://localhost:8080/storage/buttons');

  console.log("(client: send_get) Response from get request: ", res.data);
};
// ----------------------------------------------------------------------------
const run_test = (run: string) => {
  switch (run){
    case 'post': { post(); break; }
    case 'get': { get(); break; }
    case 'init_database': { init_database(); break}
    default: { return ""; }
  }
}

export { run_test };
