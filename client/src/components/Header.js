import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const Header = () => {
  const classes = useStyles();
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
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default withRouter(Header);
