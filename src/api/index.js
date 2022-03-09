import axios from 'axios';
import {base_url} from './ServiceURL';

export default function Api(type, serviceUrl, data) {
  let url = base_url + serviceUrl;

  switch (type) {
    case 'get':
      return axios
        .get(url)
        .then(response => {
          __DEV__ && console.log('Get Response : ', response);
          return response.data;
        })
        .catch(error => {
          __DEV__ && console.log('axios error get ', serviceUrl, error);
          throw error;
        });
    case 'post':
      return axios
        .post(url, data)
        .then(response => {
          __DEV__ && console.log('Get Response : ', response);
          return response.data;
        })
        .catch(error => {
          __DEV__ && console.log('axios error post ', serviceUrl, error);
          throw error;
        });
    default:
      return;
  }
}
