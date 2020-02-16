import { Switch, Route, useHistory } from 'react-router-dom';
import React, { Fragment, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Books from '../pages/Books';

import { SIGN_UP_URL, HOME_URL, LOGIN_URL } from '../constants';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '20px',
  },
}));

const App = () => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      history.push(LOGIN_URL);
    }
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path={SIGN_UP_URL} component={SignUp} />
          <Route exact path={LOGIN_URL} component={Login} />
          <Route exact path={HOME_URL} component={Books} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default App;
