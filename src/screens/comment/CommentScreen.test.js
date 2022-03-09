import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../../App';

import Comment from '.';

const route = {
  params: {
    idArray: [123, 456],
    storyItem: {id: 789},
  },
};

it('Comment screen renders correctly', () => {
  const HomeScreen = renderer
    .create(
      <Provider store={store}>
        <Comment route={route} />
      </Provider>,
    )
    .toJSON();
  expect(HomeScreen).toMatchSnapshot();
});
