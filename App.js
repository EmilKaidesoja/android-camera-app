import React from 'react';
import { Provider } from "react-redux";
import AppContainer from "./src/containers/AppContainer";
import configureStore from "./store/configureStore";

export const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
  );
}