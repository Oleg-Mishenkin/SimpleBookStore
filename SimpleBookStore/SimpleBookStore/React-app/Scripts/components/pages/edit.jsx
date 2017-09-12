import React, { PropTypes } from 'react';
import { Link as RouteLink, withRouter } from 'react-router-dom';
import Link, { LinkedComponent } from 'valuelink';
import { ValidatedInput } from '../views/formInput';
import BookEdit from '../views/bookEdit';
import AuthorsEdit from '../views/authorsEdit';
import { isRequired, isISBN } from '../libs/linkTags';
import ApiService from '../common/apiService';

class Edit extends LinkedComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: false,
            loaded: false,
            successUpdate: false,
            id: this.props.match.params.id,
            title: '',
            pages: 0,
            publisher: '',
            publishDate: '',
            isbn: '',
            authors: []
        };

        this.manager = new ApiService();
        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);
    }

    componentDidMount() {
        var that = this;
        this.manager.getBook(this.state.id).then((data) => {
            var model = data.data;
            that.setState({
                loaded: true,
                title: model.Title,
                pages: model.Pages,
                publisher: model.Publisher,
                publishDate: model.PublishDate,
                isbn: model.ISBN,
                authors: model.Authors,
            });
        }).catch(function (error) {
            that.onError(error);
        });
    }

    onSubmit(e) {
        var that = this;
        this.setState({ successUpdate: false });
        e.preventDefault();

        var model = {};
        model.id = this.state.id;
        model.title = this.state.title;
        model.pages = this.state.pages;
        model.publisher = this.state.publisher;
        model.publishDate = this.state.publishDate;
        model.isbn = this.state.isbn;

        this.manager.updateBook(model).then((response) => {
            that.setState({ successUpdate: true });
        }).catch(function (error) {
            that.onError(error)
        });
    }

    onError(error) {
        console.log(error);
        this.setState({ error: true });
    }

    render() {
        const linked = this.linkAll();
        return (
            <div>
                {this.state.error ? <div className="alert alert-danger" role="alert">Error occured during api call</div> : null}
                {this.state.successUpdate ? <div className="alert alert-success" role="alert">Success update</div> : null}
                <div className="page-header">
                    <h1>Edit book</h1>
                </div>
                {this.state.loaded ?
                    <div className="row">
                        <div className="col-md-6">
                            <BookEdit title={linked.title} pages={linked.pages} publisher={linked.publisher} publishDate={linked.publishDate} isbn={linked.isbn} />
                            
                            <button className="btn btn-primary"
                                type="submit"
                                value="Submit"
                                onClick={this.onSubmit}
                                disabled={linked.title.error
                                    || linked.pages.error
                                    || linked.publisher.error
                                    || linked.isbn.error
                                    || linked.publishDate.error} >Update book</button>
                        </div>
                        <div className="col-md-6">
                            <AuthorsEdit authors={this.state.authors} bookId={this.state.id} onError={this.onError} />
                        </div>
                    </div>
                    : null}
            </div>)
    }
}

export default Edit;