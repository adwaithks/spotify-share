export async function postData(url, postBody, headers = {'Content-Type': 'application/json'}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postBody)
      });
    let data = await response.json();
    return data;
}
