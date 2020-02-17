import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import Book from '../components/Book';
import AddBook from '../components/AddBook';
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

const GET_BOOKS = gql`
  query books {
    books { ...BookDetails }
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

const LEND_BOOK = gql`
  mutation LendBook($input: NewLendBookInput!) {
    lendBook(input: $input) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const RETURN_BOOK = gql`
  mutation ReturnBook($input: NewRequestBookInput!) {
    returnBook(input: $input) {
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
  defaultAction: {
    position: 'relative',
    background: 'white',
    height: '52px',
  },
}));

const Books = () => {
  const [modal, setModal] = useState(false);
  const books = useQuery(GET_BOOKS, {
    fetchPolicy: 'cache-and-network',
  });
  const classes = useStyles();

  const [createBook, newBook] = useMutation(CREATE_BOOK, {
    update(cache, { data: { addBook } }) {
      const { books } = cache.readQuery({ query: GET_BOOKS });

      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: [addBook, ...books] }
      });
    }
  });

  const [acceptRequest, lendRequest] = useMutation(LEND_BOOK);
  const [returnBook, returnRequest] = useMutation(RETURN_BOOK);

  if (books.loading) return <Loader />
  if (books.error || newBook.error || lendRequest.error || returnRequest.error) {
    return <p>ERROR</p>;
  }

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
          description: input.description,
        }
      }
    })
  };

  const onLend = input => {
    acceptRequest({
      variables: {
        input: { id: input.id, requestedBy: input.requestedBy }
      },
    
      optimisticResponse: {
        __typename: 'Mutation',
        lendBook: {
          __typename: 'Book',
          id: input.id,
          requestedBy: input.requestedBy
        }
      }
    })
  };

  const onReturn = input => {
    returnBook({
      variables: {
        input: { id: input.id }
      },
    
      optimisticResponse: {
        __typename: 'Mutation',
        returnBook: {
          __typename: 'Book',
          id: input.id
        }
      }
    })
  };

  const renderActionArea = (book) => {
    if (book.requestedBy) {
      return (
        <CardActions className={classes.action}>
          <Button variant="contained" onClick={() => onLend(book)}>
            Lend book
          </Button>

          <Chip
            className={classes.actionChip}
            icon={<CheckIcon />}
            label="Requested"
            color="secondary"
          />
        </CardActions>
      );
    }

    if (book.borrowedBy) {
      return (
        <CardActions className={classes.action}>
          <Button variant="contained" onClick={() => onReturn(book)}>
            Returned
          </Button>

          <Chip
            className={classes.actionChip}
            icon={<CheckIcon />}
            label="Borrowed"
            color="secondary"
          />
        </CardActions>
      );
    }

    return <CardActions className={classes.defaultAction}></CardActions>;
  };

  const getBooksList = (books) => {
    if (!books.data.books.length) {
      return (
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            You haven't added any books yet. Click the button below to start!
          </Typography>
        </Grid>
      );
    };

    return books.data.books.map(book => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
        <Book book={book} renderActionArea={renderActionArea} />
      </Grid>
    ));
  }; 
  
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
        <Button variant="contained" color="primary" onClick={() => setModal(true)}>
          Add book
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
            { getBooksList(books) }
        </Grid>
      </Grid>
    </Grid>
  )
};

export default Books;
