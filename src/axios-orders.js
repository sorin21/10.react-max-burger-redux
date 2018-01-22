import axios from "axios";

const instance = axios.create({
  baseURL: 'https://react-burger-project-5c90d.firebaseio.com/',
});

export default instance;