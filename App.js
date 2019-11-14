import React from 'react';
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import AppContainer from "./src/containers/AppContainer";
import configureStore from "./store/configureStore";
import {
  askCameraPermission,
  askCameraRollPermission,
} from "./store/actions";

export const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
  );
}