import {
  IS_INTERNET_REACHABLE,
  SET_TOP_STORIES_ID,
  SET_STORY,
} from '../actions/ActionType';

let initialState = {
  isInternetReachable: false,
  topStoriesIDArray: [],
  topStoriesArray: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_INTERNET_REACHABLE:
      return {
        ...state,
        isInternetReachable: action.isInternetReachable,
      };
    case SET_TOP_STORIES_ID:
      return {
        ...state,
        topStoriesIDArray: action.data,
        topStoriesArray: [],
      };
    case SET_STORY:
      let {topStoriesArray} = state;
      topStoriesArray = [...topStoriesArray, ...action.data];
      return {
        ...state,
        topStoriesArray,
      };
    default:
      return state;
  }
};

export default AppReducer;
