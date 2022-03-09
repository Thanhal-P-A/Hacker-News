import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import NetworkError from './NetworkError';
import Story from './Story';

it('NetworkError component renders correctly', () => {
  const NetworkErrorComponent = renderer.create(<NetworkError />).toJSON();
  expect(NetworkErrorComponent).toMatchSnapshot();
});

it('Story component renders correctly', () => {
  const StoryComponent = renderer.create(<Story />).toJSON();
  expect(StoryComponent).toMatchSnapshot();
});
