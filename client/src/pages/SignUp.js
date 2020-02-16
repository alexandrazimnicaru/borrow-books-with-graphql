import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { HOME_URL } from '../constants';

const CREATE_USER = gql`
  mutation CreateUser($input: NewUserInput!) {
    addUser(input: $input) {
      id
      username
      refreshToken
      token
    }
  }
`;

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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const [createUser, newUser] = useMutation(CREATE_USER, {
    update(cache, { data }) {
      const addUserData = data.addUser;
      if (!addUserData || !addUserData.token || !addUserData.refreshToken) {
        return;
      }

      // set username in global context
      localStorage.setItem('access_token', addUserData.token);
      localStorage.setItem('refresh_token', addUserData.refreshToken);
      history.push(HOME_URL);
    }
  });

  if (newUser.error) return <p>ERROR</p>

  const onSubmit = (e) => {
    e.preventDefault();

    createUser({
      variables: { input: { username, password } },
    
      optimisticResponse: {
        __typename: 'Mutation',
        addUser: {
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
        <Typography variant="h5">Sign Up</Typography>
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
                Sign up
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
};

export default SignUp;
