import axios, { AxiosResponse } from 'axios';

import { ButtonsTest } from '../../wcag/interfaces';

const post = async(url: string, req: string) => {
  try {
    const config  = { headers: { "Content-Type": "application/json" }};
    const res: AxiosResponse = await axios.post(url, req, config);

    console.log("\n(client: send_post) Response from post request: ", res.data);

  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response && e.response.data){
      console.log(e.response.data);
    }
  }
}
const post_object = async() => {
  const data_object: ButtonsTest = {
    htmlString: "html string",
    correctText: "correct test",
    name: "name",
    comment: "comment",
    checked: true,
    url: "url",
    testID: "id",
    chromeVersion : null,
    chromeExtensionVersion: null,
    outcome: "outcome"
  };

  post('http://localhost:8080/storage/saveButtons', JSON.stringify(data_object));
}
const post_json = async() => {
  const json_data = JSON.stringify({name: 'insert JSON data here'});
  //const json_data = JSON.stringify({
    //htmlString: "html string",
    //correctText: "correct test",
    //name: "name",
    //comment: "comment",
    //checked: true,
    //url: "url",
    //testID: "id",
    //chromeVersion : null,
    //chromeExtensionVersion: null,
    //outcome: "outcome"
  //});
  post('http://localhost:8080/storage/saveButtons', json_data);
};

const get = async() => {
  try {
    const res: AxiosResponse = await axios.get('http://localhost:8080/storage/buttons');
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
    case 'post_object': { post_object(); break; }
    case 'get': { get(); break; }
    default: { return ""; }
  }
}

export { run_test };
