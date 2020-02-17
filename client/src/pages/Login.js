import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../contexts/UserContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { MY_BOOKS_URL } from '../constants';

const LOGIN = gql`
  mutation Login($input: NewUserInput!) {
    login(input: $input) {
      id
      username
      refreshToken
      token
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  field: {
    display: 'block',
    paddingBottom: '20px',
  },
  lastField: {
    width: '100%',
    paddingBottom: '40px',
  },
}));

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const [login, newUser] = useMutation(LOGIN, {
    update(cache, { data }) {
      const loginData = data.login;
      if (!loginData || !loginData.token || !loginData.refreshToken) {
        return;
      }

      setUser({ id: loginData.id, username: loginData.username });
      localStorage.setItem('access_token', loginData.token);
      localStorage.setItem('refresh_token', loginData.refreshToken);
      history.push(MY_BOOKS_URL);
    }
  });

  if (newUser.error) return <p>ERROR</p>

  const onSubmit = (e) => {
    e.preventDefault();

    login({
      variables: { input: { username, password } },
    
      optimisticResponse: {
        __typename: 'Mutation',
        login: {
          __typename: 'User',
          id: Math.round(Math.random() * -1000000) + '',
          username,
          password,
        }
      }
    });
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5">Login</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <form onSubmit={onSubmit}>
              <TextField
                className={classes.field}
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
                required
              />

              <TextField
                className={classes.field}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
              />

              <Button variant="contained" color="primary" type="submit" name="submit">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
};

export default Login;
