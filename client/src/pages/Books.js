import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Book from '../components/Book';
import AddBook from '../components/AddBook';
import Loader from '../components/Loader';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author
    genre
  }
`

const GET_BOOKS = gql`
  query books($input: ID) {
    books(userId: $input) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const CREATE_BOOK = gql`
  mutation CreateBook($input: NewBookInput!) {
    addBook(input: $input) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Books = () => {
  const [modal, setModal] = useState(false);
  const books = useQuery(GET_BOOKS);
  const classes = useStyles();

  const [createBook, newBook] = useMutation(CREATE_BOOK, {
    update(cache, { data: { addBook } }) {
      const { books } = cache.readQuery({ query: GET_BOOKS })

      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: [addBook, ...books] }
      });
    }
  });

  if (books.loading) return <Loader />
  if (books.error || newBook.error) return <p>ERROR</p>

  const onSubmit = input => {
    setModal(false)
    createBook({
      variables: {input},
    
      optimisticResponse: {
        __typename: 'Mutation',
        addBook: {
          __typename: 'Book',
          id: Math.round(Math.random() * -1000000) + '',
          title: input.title,
          author: input.author,
          genre: input.genre,
        }
      }
    })
  }

  const booksList = books.data.books.map(book => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
      <Book {...book} />
    </Grid>
  ))
  
  if (modal) {
    return (
      <div>
        <AddBook onSubmit={onSubmit} onCancel={() => setModal(false)} />
      </div>
    )
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5">Books</Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {booksList}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => setModal(true)}>
          Add book
        </Button>
      </Grid>
    </Grid>
  )
};

export default Books;
