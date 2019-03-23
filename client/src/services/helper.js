import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //     'Authorization': `Bearer ${TOKEN}`
  // }
});

const getHello = async () => {
  try {
    const resp = await api(`/`)
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

export {
  getHello,
}
