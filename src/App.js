import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "./Hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout';
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from "./store/actions/index";

const Checkout = lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = lazy(() => {
  return import("./containers/Orders/Orders");
});

const Auth = lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const routes = !props.isAuth
    ? (
      <Switch>
        <Route path="/login" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route component={ErrorPage} />
      </Switch>)
    : (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/login" render={(props) => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route component={ErrorPage} />
      </Switch>
    );
  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));