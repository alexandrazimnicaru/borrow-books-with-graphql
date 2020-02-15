import { Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Books from '../pages/Books';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '20px',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path="/" component={Books} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default App;
