import React from 'react';
import Layot from './hoc/Layot/Layot';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <Layot>
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/checkout' component={Checkout} />
      </Switch>
    </Layot>
  );
}

export default App;
