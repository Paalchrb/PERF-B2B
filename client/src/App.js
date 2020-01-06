import React, { Fragment } from 'react';
import './App.css';
//redux:
import { Provider } from 'react-redux'; //all Components wrapped in Provider will have access to store(state)
import store from './store';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <h1>App</h1>
      <p>Added folder structure and this paragraph to test if deployed</p>
    </Fragment>
  </Provider>
);
  

export default App;
