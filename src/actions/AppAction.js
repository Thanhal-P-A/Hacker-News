import Api from '../api';
import URL from '../api/ServiceURL';
import {
  IS_INTERNET_REACHABLE,
  SET_TOP_STORIES_ID,
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
  return Api('get', url);
}

export async function FetchItem(id) {
  const url = URL.FetchStoryItem + id + '.json';
  return Api('get', url);
}

export function SetTopStoriesID(data) {
  store.dispatch({
    type: SET_TOP_STORIES_ID,
    data,
  });
}

export function SetStory(data) {
  store.dispatch({
    type: SET_STORY,
    data,
  });
}
