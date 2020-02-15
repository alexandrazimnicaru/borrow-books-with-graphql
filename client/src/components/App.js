import { Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';

import Header from './Header';
import Books from '../pages/Books';

const App = () => (
  <Fragment>
    <Header />
    <div>
      <Switch>
        <Route exact path="/" component={Books} />
      </Switch>
    </div>
  </Fragment>
);

export default App;
