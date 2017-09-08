import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import ApiService from './common/api-service';
import BookView from './bookView';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ApiService();
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    var that = this;
    this.manager.getAll().then((data) => {
      that.setState({ books: data.data });
    }).catch(function (error) {
      console.log(error);
      that.setState({ error: true });
    });;
  }

  onBookRemove(book) {
    var that = this;
    this.manager.removeBook(book.Id).then(() => {
      var newbooks = that.state.books.filter(i => i.Id !== book.Id)
      this.setState({ books: newbooks });
    }).catch(function (error) {
      console.log(error);
      that.setState({ error: true });
    });;
  }

  sortBooks(books) {
    return books;
  }

  render() {
    var that = this;
    var tableBody;
    var hasError = this.state.error;
    if (!hasError) tableBody = this.sortBooks(this.state.books).map(function (book) {
      return <BookView key={book.Id} book={book} onRemoveClick={() => that.onBookRemove(book)} />
    });


    return (
      <div>
        {hasError ? <div className="alert alert-danger" role="alert">Error occured during api call</div> : null}
        <div className="page-header">
          <h1>Books</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Pages</th>
              <th>Publisher</th>
              <th>Publish Date</th>
              <th>ISBN</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table></div>
    );
  }
}

export default App;