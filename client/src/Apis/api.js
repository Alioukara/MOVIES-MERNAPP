import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://weloveallmovies.herokuapp.com/'

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;


export default axiosClient;