const api = import.meta.env.VITE_API;
console.log(api);

const token = localStorage.getItem("token");

export default async function userAuthApi(route, data) {
  try {
    const res = await fetch(`${api}/user/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("ress ", res);
    const response = await res.json();
    console.log("this is response", response);
    return response;
  } catch (err) {
    console.log("error", err);
  }
}

export async function postApi(data='', type, query='') {
  try {
    console.log("data", data);
    const res = await fetch(`${api}/posts${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: type,
      body: data,
    });

    const response = await res.json();
    return response
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export async function getPostApi(route, type="GET") {
  try {
    const res = await fetch(`${api}/${route}`, {
        method: type,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
