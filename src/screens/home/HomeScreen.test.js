import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../../../App';

import Home from '.';

it('Home screen renders correctly', () => {
  const HomeScreen = renderer
    .create(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    .toJSON();
  expect(HomeScreen).toMatchSnapshot();
});