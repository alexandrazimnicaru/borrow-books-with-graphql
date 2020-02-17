import React from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import PanToolIcon from '@material-ui/icons/PanTool';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import * as CONSTANTS from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    bottom: 0,
    boxShadow: '0px 2px 1px 2px rgba(0,0,0,0.2)',
  },
}));

const TAB_URLS = [
  CONSTANTS.MY_BOOKS_URL,
  CONSTANTS.SEARCH_BOOKS_URL,
  CONSTANTS.REQUESTED_BOOKS_URL,
  CONSTANTS.BORROWED_BOOKS_URL,
];

const Navigation = (props) => {
  const { pathname } = props.location;
  const [value, setValue] = React.useState(TAB_URLS.indexOf(pathname));
  const history = useHistory();
  const classes = useStyles();

  const goToUrl = (url) => {
    history.push(url);
  };

  if (pathname === CONSTANTS.SIGN_UP_URL ||
    pathname === CONSTANTS.LOGIN_URL) {
    return null;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels  
      className={classes.root}
    >
      <BottomNavigationAction
        label="My books"
        icon={<MenuBookIcon />}
        onClick={() => goToUrl(CONSTANTS.MY_BOOKS_URL)}
      />
      <BottomNavigationAction
        label="Search books"
        icon={<SearchIcon />}
        onClick={() => goToUrl(CONSTANTS.SEARCH_BOOKS_URL)}
      />
      <BottomNavigationAction
        label="Requested books"
        icon={<PanToolIcon />}
        onClick={() => goToUrl(CONSTANTS.REQUESTED_BOOKS_URL)}
      />
      <BottomNavigationAction
        label="Borrowed books"
        icon={<ShoppingBasketIcon />}
        onClick={() => goToUrl(CONSTANTS.BORROWED_BOOKS_URL)}
      />
    </BottomNavigation>
  );
};

export default withRouter(Navigation);
