import Api from '../api';
import URL from '../api/ServiceURL';
import {
  IS_INTERNET_REACHABLE,
  FETCH_TOP_STORIES_ID,
  SET_STORY,
} from './ActionType';
import {store} from '../../App';

export function IsInternetReachable(isInternetReachable) {
  store.dispatch({
    type: IS_INTERNET_REACHABLE,
    isInternetReachable,
  });
}

export async function FetchTopStoriesID() {
  const url = URL.FetchTopStoriesID + '.json';
  const data = await Api('get', url);
  store.dispatch({
    type: FETCH_TOP_STORIES_ID,
    data,
  });
  return data;
}

export async function FetchItem(id) {
  const url = `${URL.FetchStoryItem}/${id}.json`;
  const data = Api('get', url);
  return data;
}

export function SetStory(data) {
  store.dispatch({
    type: SET_STORY,
    data,
  });
}
