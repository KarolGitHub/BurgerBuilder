import React from 'react';
import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch} from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Orders from './containers/Orders/Orders';

function App() {
  /* state = {
    show: true,
  }; */

  /* componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  } */
  return (
    <div >
      <Layout>
      </Layout>
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders}/>
        <Route path='/' exact component={BurgerBuilder} />
        <Route component={ErrorPage} />
      </Switch>


    </div>
  );
}

export default App;
