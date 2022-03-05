import axios from 'axios';
import {base_url} from './ServiceURL';

export default async function Api(type, serviceUrl, params) {
  let url = base_url + serviceUrl;

  switch (type) {
    case 'get':
      try {
        const response = await axios.get(url);
        __DEV__ && console.log('Get Response : ', response);
        return response.data;
      } catch (error) {
        __DEV__ && console.log('axios error get :', error);
      }
    case 'post':
      try {
        const response = await axios.post(url, params);
        __DEV__ && console.log('Post response : ', response);
        return response.data;
      } catch (error) {
        __DEV__ && console.log('axios error post : ', error);
      }
    default:
      break;
  }
}
