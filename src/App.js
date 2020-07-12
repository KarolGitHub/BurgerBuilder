import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
class App extends Component {
  /* state = {
    show: true,
  }; */

  /* componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  } */
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
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
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
