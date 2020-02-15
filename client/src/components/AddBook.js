import React, { useState } from 'react';

const AddBook = ({onSubmit, onCancel}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const submit = e => {
    e.preventDefault();
    onSubmit({ title, author, genre });
  }

  const cancel = e => {
    e.preventDefault();
    onCancel();
  }

  return (
    <div className="add-book">
      <h1>New Book</h1>

      <div>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            required
          />
          <button type="button" onClick={cancel}>Cancel</button>          
          <button type="submit" name="submit">Add book</button>
        </form>
      </div>
    </div>
  )
};

export default AddBook;
