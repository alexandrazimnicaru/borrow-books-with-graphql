import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Book from '../components/Book';
import Loader from '../components/Loader';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author
    genre
    description
    requestedBy
    borrowedBy
  }
`

const SEARCH_BOOKS = gql`
  query search {
    search { ...BookDetails }
  }
  ${BOOK_DETAILS}
`

const REQUEST_BOOK = gql`
  mutation CreateBook($input: NewRequestBookInput!) {
    requestBook(input: $input) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

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

const SearchBooks = () => {
  const books = useQuery(SEARCH_BOOKS, {
    fetchPolicy: 'cache-and-network',
  });
  const classes = useStyles();

  const [createRequest, newRequest] = useMutation(REQUEST_BOOK, { });

  if (books.loading) return <Loader />
  if (books.error || newRequest.error) return <p>ERROR</p>

  const onRequest = input => {
    createRequest({
      variables: {
        input: { id: input.id }
      },
    
      optimisticResponse: {
        __typename: 'Mutation',
        requestBook: {
          __typename: 'Book',
          id: input.id,
        }
      }
    })
  };

  const renderActionArea = (book) => {
    if (book.requestedBy) {
      return (
        <CardActions className={classes.action}>
          <Chip
            className={classes.actionChip}
            icon={<CheckIcon />}
            label="Requested"
            color="secondary"
          />
        </CardActions>
      );
    }

    return (
      <CardActions className={classes.action}>
        <Button variant="contained" onClick={() => onRequest(book)}>Request</Button>
      </CardActions>
    );
  };

  const getBooksList = (books) => {
    if (!books.data.search.length) {
      return (
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            No search results.
          </Typography>
        </Grid>
      );
    };

    return books.data.search.map(book => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
        <Book book={book} renderActionArea={renderActionArea} />
      </Grid>
    ));
  }; 

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5">Search Books</Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
            { getBooksList(books) }
        </Grid>
      </Grid>
    </Grid>
  )
};

export default SearchBooks;
