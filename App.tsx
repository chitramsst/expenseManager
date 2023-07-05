/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import axios from 'axios';
axios.defaults.baseURL = 'https://www.cashtide.shop/api/';

import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import appStore from './src/stores/store';
import { Provider } from "react-redux";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Navigator from './src/navigator';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let persistor = persistStore(appStore)
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor} >
        <Navigator />
      </PersistGate>
    </Provider>
  );
}

export default App;