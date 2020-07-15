import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import asyncComponent from './Hoc/hoc/asyncComponent/asyncComponent';
import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
})
class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = !this.props.isAuth
      ? (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/login' component={Auth} />
          <Route component={ErrorPage} />
        </Switch>
      ) : (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/login' component={Auth} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={asyncLogout} />
          <Route component={ErrorPage} />
        </Switch>
      );

    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
