import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    paddingBottom: '20px',
  },
  lastField: {
    width: '100%',
    paddingBottom: '40px',
  },
  cancelBtn: {
    float: 'right',
  }
}));

const AddBook = ({onSubmit, onCancel}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const classes = useStyles();

  const submit = e => {
    e.preventDefault();
    onSubmit({ title, author, genre });
  }

  const cancel = e => {
    e.preventDefault();
    onCancel();
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5">New book</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <form onSubmit={submit}>
              <div>
                <TextField
                  className={classes.field}
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <TextField
                  className={classes.field}
                  placeholder="Author"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  required
                />
              </div>

              <div>
                <TextField
                  className={classes.lastField}
                  placeholder="Genre"
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  required
                />
              </div>

              <div>
                <Button variant="contained" color="primary" type="submit" name="submit">
                  Add book
                </Button>

                <Button
                  variant="contained"
                  type="button"
                  onClick={cancel}
                  className={classes.cancelBtn}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
};

export default AddBook;
