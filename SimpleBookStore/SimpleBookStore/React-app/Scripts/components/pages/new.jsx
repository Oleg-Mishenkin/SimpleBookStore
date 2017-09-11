import React, { PropTypes } from 'react';
import { Link as RouteLink, withRouter } from 'react-router-dom';
import Link, { LinkedComponent } from 'valuelink';
import { ValidatedInput } from '../views/formInput';
import BookEdit from '../views/bookEdit';
import { isRequired, isISBN } from '../libs/linkTags';
import ApiService from '../common/apiService';

class New extends LinkedComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: false,
            title: '',
            pages: 0,
            publisher: '',
            publishDate: '',
            isbn: '',
            authorFirstName: '',
            authorLastName: '',
        };

        this.manager = new ApiService();
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        var that = this;
        e.preventDefault();
        this.manager.createBook(this.state).then((response) => {
            window.location.assign(response.headers.location);
        }).catch(function (error) {
            console.log(error);
            that.setState({ error: true });
        });
    }

    render() {
        const linked = this.linkAll();
        
        linked.authorFirstName
            .check(isRequired)
            .check(x => x.length <= 20, 'Author First Name is too long');

        linked.authorLastName
            .check(isRequired)
            .check(x => x.length <= 20, 'Author Last Name is too long');

        return (
            <div>
                {this.state.error ? <div className="alert alert-danger" role="alert">Error occured during api call</div> : null}
                <div className="page-header">
                    <h1>Create new book</h1>
                </div>

                <BookEdit title={linked.title} pages={linked.pages} publisher={linked.publisher} publishDate={linked.publishDate} isbn={linked.isbn} />                
                <ValidatedInput id="authorFirstName" valueLink={linked.authorFirstName} label="Author First Name" />
                <ValidatedInput id="authorLastName" valueLink={linked.authorLastName} label="Author Last Name" />

                <button className="btn btn-primary"
                    type="submit"
                    value="Submit"
                    onClick={this.onSubmit}
                    disabled={linked.title.error
                        || linked.pages.error
                        || linked.publisher.error
                        || linked.isbn.error
                        || linked.publishDate.error
                        || linked.authorFirstName.error
                        || linked.authorLastName.error} >Submit</button>
            </div>)
    }
}

export default New;