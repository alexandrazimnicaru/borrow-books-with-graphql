import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

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

const Books = () => {
  const [modal, setModal] = useState(false)
  const books = useQuery(GET_BOOKS)

  const [createBook, newBook] = useMutation(CREATE_BOOK, {
    update(cache, { data: { addBook } }) {
      const { books } = cache.readQuery({ query: GET_BOOKS })

      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: [addBook, ...books] }
      })
    }
  })

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
    <div key={book.id}>
      {book.title}
    </div>
  ))
  
  if (modal) {
    return (
      <div>
        <AddBook onSubmit={onSubmit} onCancel={() => setModal(false)} />
      </div>
    )
  }

  return (
    <div className="books">
      <section>
        <h1>Books</h1>
        {booksList}
      </section>

      <section>
        <button onClick={() => setModal(true)}>Add book</button>
      </section>
    </div>
  )
};

export default Books;
