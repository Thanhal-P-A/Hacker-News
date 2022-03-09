import reducer from './AppReducer';
import * as actionTypes from '../actions/ActionType';
const initialState = {
  isInternetReachable: false,
  topStoriesIDArray: [],
  topStoriesArray: [],
};

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('check IS_INTERNET_REACHABLE ', () => {
    const action = {
      type: actionTypes.IS_INTERNET_REACHABLE,
      isInternetReachable: true,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isInternetReachable: action.isInternetReachable,
    });
  });

  it('check SET_TOP_STORIES_ID ', () => {
    const action = {
      type: actionTypes.SET_TOP_STORIES_ID,
      data: [...Array(500).keys()],
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      topStoriesIDArray: action.data,
      topStoriesArray: [],
    });
  });

  it('check SET_STORY ', () => {
    const action = {
      type: actionTypes.SET_STORY,
      data: [{id: 123}, {id: 345}],
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      topStoriesArray: [...initialState.topStoriesArray, ...action.data],
    });
  });
});
