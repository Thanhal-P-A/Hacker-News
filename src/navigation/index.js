import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home';
import Comment from '../screens/comment';
import Color from '../common/Color';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerStyle: {backgroundColor: Color.Header}}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Hacker News - Top Stories'}}
        />
        <Stack.Screen
          name="Comment"
          component={Comment}
          options={{title: 'Hacker News - Comments'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
