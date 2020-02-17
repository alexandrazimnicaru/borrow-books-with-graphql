import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../contexts/UserContext';
import Container from '@material-ui/core/Container';
import Header from './Header';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Books from '../pages/Books';
import SearchBooks from '../pages/SearchBooks';
import RequestedBooks from '../pages/RequestedBooks';
import BorrowedBooks from '../pages/BorrowedBooks';
import Navigation from './Navigation';

import * as CONSTANTS from '../constants';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '20px',
    paddingBottom: '80px',
  },
}));

const App = () => {
  const user = useState({});
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      history.push(CONSTANTS.LOGIN_URL);
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path={CONSTANTS.SIGN_UP_URL} component={SignUp} />
          <Route exact path={CONSTANTS.LOGIN_URL} component={Login} />
          <Route exact path={CONSTANTS.MY_BOOKS_URL} component={Books} />
          <Route exact path={CONSTANTS.SEARCH_BOOKS_URL} component={SearchBooks} />
          <Route exact path={CONSTANTS.REQUESTED_BOOKS_URL} component={RequestedBooks} />
          <Route exact path={CONSTANTS.BORROWED_BOOKS_URL} component={BorrowedBooks} />
        </Switch>
      </Container>
      <Navigation />
    </UserContext.Provider>
  );
};

export default App;
