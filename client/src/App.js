import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import Orders from './components/order/Orders';
import SingleOrder from './components/order/SingleOrder';
import ProductSearch from './components/products/ProductSearch';
import SinglePageProductView from './components/products/SinglePageProductView';
import MyProducts from './components/products/MyProducts';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import ShopCart from './components/shopCart/ShopCart';
//redux:
import { Provider } from 'react-redux'; //all Components wrapped in Provider will have access to store(state)
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';


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
      <Alert />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/orders' component={Orders} />
        <PrivateRoute path='/orders/:orderId' component={SingleOrder} />
        <Route exact path='/products' component={ProductSearch} />
        <Route exact path='/products/:productId' component={SinglePageProductView} />
        <PrivateRoute path='/shopcart' component={ShopCart} />
        <PrivateRoute path='/myproducts' component={MyProducts} />
        <Route path='/' component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)};

export default App;
