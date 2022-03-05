import React, {useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import NetInfo from '@react-native-community/netinfo';

import {IsInternetReachable} from './actions/AppAction';
import NetworkError from './components/NetworkError';
import SwitchNavigator from './navigation';

const exceptionhandler = e => {
  __DEV__ && console.log('exception handler : ', e);
  if (e != undefined && !e.toString().includes('componentWillUnmount'))
    Alert.alert(
      'Unexpected error occurred',
      'We have reported this to our team ! Please close the app and start again!',
    );
};

setNativeExceptionHandler(exceptionhandler, false);
setJSExceptionHandler(exceptionhandler, true);

function App(props) {
  const {isInternetReachable} = useSelector(state => state.AppReducer);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      IsInternetReachable(state.isInternetReachable);
    });
    return unsubscribe();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {!isInternetReachable && NetworkError()}
      <SwitchNavigator />
    </>
  );
}

export default App;
