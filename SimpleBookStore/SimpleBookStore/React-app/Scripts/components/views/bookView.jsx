import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'

const BookView = ({ book, onRemoveClick }) => {
  return (
    <tr>
      <th><Link to={`/edit/${book.Id}`}>{book.Title}</Link></th>
      <td>
        <ul>
          {book.Authors.map(function(author) { return <li key={author.Id}>{author.AuthorFirstName} {author.AuthorLastName}</li> })}
        </ul>
      </td>
      <td>{book.Pages}</td>
      <td>{book.Publisher}</td>
      <td>{(new Date(book.PublishDate)).toLocaleDateString()}</td>
      <td>{book.ISBN}</td>
      <td></td>
      <td><button type="button" className="btn btn-default" onClick={onRemoveClick}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>
    </tr>
  );
};

export default BookView;