import React from 'react';
import Layot from './hoc/Layot/Layot';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <Layot>
      <BurgerBuilder></BurgerBuilder>
    </Layot>
  );
}

export default App;
