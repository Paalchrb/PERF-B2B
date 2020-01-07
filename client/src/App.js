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
      <p> dette er en test</p>
      <p>This is Franks paragraph</p>
      <h2>Espen was here!</h2>
      <p>hello new paragraph</p>
    </Fragment>
  </Provider>
);
  

export default App;
