import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import Book from '../components/Book';
import Loader from '../components/Loader';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author
    genre
    description
    owner {
      id
    }
    requestedBy
    borrowedBy
  }
`

const BORROWED_BOOKS = gql`
  query borrowed {
    borrowed { ...BookDetails }
  }
  ${BOOK_DETAILS}
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  action: {
    background: 'white',
    position: 'relative',
  },
  actionChip: {
    marginLeft: 'auto !important',
  },
}));

const BorrowedBooks = () => {
  const books = useQuery(BORROWED_BOOKS, {
    fetchPolicy: 'cache-and-network',
  });
  const classes = useStyles();

  if (books.loading) return <Loader />
  if (books.errorr) return <p>ERROR</p>

  const renderActionArea = () => (
    <CardActions className={classes.action}>
      <Chip
        className={classes.actionChip}
        icon={<CheckIcon />}
        label="Borrowed"
        color="secondary"
      />
    </CardActions>
  );

  const getBooksList = (books) => {
    if (!books.data.borrowed.length) {
      return (
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            You have no borrowed books at the moment.
          </Typography>
        </Grid>
      );
    }

    return books.data.borrowed.map(book => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
        <Book book={book} renderActionArea={renderActionArea} />
      </Grid>
    ));
  }; 

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5">Borrowed Books</Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
            { getBooksList(books) }
        </Grid>
      </Grid>
    </Grid>
  )
};

export default BorrowedBooks;
