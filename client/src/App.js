import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import Order from './components/order/Order';

//redux:
import { Provider } from 'react-redux'; //all Components wrapped in Provider will have access to store(state)
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token) {
  setAuthToken(localStorage.token)
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); 

  return (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/order' component={Order} />
      </Switch>
    </Router>
  </Provider>
)};

export default App;
