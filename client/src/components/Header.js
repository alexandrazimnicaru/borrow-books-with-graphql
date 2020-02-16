import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { SIGN_UP_URL, LOGIN_URL } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'inherit',
    textDecoration: 'none',
  },
  titleText: {
    verticalAlign: 'middle',
  },
  titleEmoji: {
    verticalAlign: 'text-top',
  }
}));

const Header = (props) => {
  const { pathname } = props.location;
  const history = useHistory();
  const classes = useStyles();

  const goToLogin = () => {
    history.push(LOGIN_URL);
  };

  const goToSignUp = () => {
    history.push(SIGN_UP_URL);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    goToLogin();
  };

  const getActionButton = () => {
    if (pathname === SIGN_UP_URL) {
      return <Button color="inherit" onClick={goToLogin}>Login</Button>;
    }

    if (pathname === LOGIN_URL) {
      return <Button color="inherit" onClick={goToSignUp}>Sign Up</Button>;
    }

    return <Button color="inherit" onClick={logout}>Logout</Button>;
  };

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography variant="h6">
              <span className={classes.titleEmoji}>📙</span>
              <span className={classes.titleText}>Borrow a Book</span>
            </Typography>
          </Link>
          { getActionButton() }
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default withRouter(Header);
