import { createResponse } from "./createResponse";

export async function postData(url, postBody, headers = {'Content-Type': 'application/json'}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postBody)
      });

    let data = await response.json();
    console.log('data:: ', data);
    let res; 

    if (response.status != 200) {
      res = createResponse(response.status, data.error.type);
    }  else {
      res = createResponse(200, "", data.data);
    }

    return res;
}
