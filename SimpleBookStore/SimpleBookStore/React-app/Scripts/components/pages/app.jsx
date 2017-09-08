import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import ApiService from '../common/apiService';
import BookView from '../views/bookView';
import SortableHeader from '../views/sortableHeader';
import { Sort } from '../common/sortHelper';
import StorageService from '../common/storageService';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ApiService();
    this.storageService = new StorageService();

    this.state = {
      books: [],
      activeHeader: ''
    }

    this.onSortChanged = this.onSortChanged.bind(this)
  }

  componentDidMount() {
    var that = this;
    this.manager.getAll().then((data) => {
      var books = data.data;
      debugger;
      var sortObj = this.storageService.getSortProp();
      if (sortObj) {
        books = Sort(books, sortObj.sortProp, sortObj.sortAsc);
      }
      that.setState({ books: books });
    }).catch(function (error) {
      console.log(error);
      that.setState({ error: true });
    });
  }

  onBookRemove(book) {
    var that = this;
    this.manager.removeBook(book.Id).then(() => {
      var newbooks = that.state.books.filter(i => i.Id !== book.Id);
      this.setState({ books: newbooks });
    }).catch(function (error) {
      console.log(error);
      that.setState({ error: true });
    });;
  }

  onSortChanged(sortProp, sortAsc) {
    if (this.state.books && this.state.books.length) {
      var sortedBooks = Sort(this.state.books, sortProp, sortAsc);
      this.setState({ books: sortedBooks });
    }
    this.setState({ activeHeader: sortProp });
  }

  render() {
    var that = this;
    var tableBody;
    var hasError = this.state.error;
    if (!hasError) tableBody = this.state.books.map(function (book) {
      return <BookView key={book.Id} book={book} onRemoveClick={() => that.onBookRemove(book)} />
    });


    return (
      <div>
        {hasError ? <div className="alert alert-danger" role="alert">Error occured during api call</div> : null}
        <div className="page-header">
          <h1>Books</h1>
        </div>
        <div className="btn-group" role="group">
            <Link role="button" className="btn btn-default" to={'/Books/new'}>Create new</Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <SortableHeader sortProp='Title' onSortChanged={this.onSortChanged} activeHeader={this.state.activeHeader} />
              <th>Authors</th>
              <th>Pages</th>
              <th>Publisher</th>
              <SortableHeader sortProp='PublishDate' onSortChanged={this.onSortChanged} activeHeader={this.state.activeHeader} />
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