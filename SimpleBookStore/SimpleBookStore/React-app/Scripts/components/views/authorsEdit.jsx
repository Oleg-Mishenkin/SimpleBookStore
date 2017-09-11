import React, { PropTypes } from 'react';
import Link, { LinkedComponent } from 'valuelink';
import Modal from 'react-modal';
import { ValidatedInput } from '../views/formInput';
import { isRequired, isISBN } from '../libs/linkTags';
import ApiService from '../common/apiService';

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class AuthorsEdit extends LinkedComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: false,
            authors: this.props.authors,
            bookId: this.props.bookId,
            dialog: null,
            editing: null
        };

        this.manager = new ApiService();

        this.closeDialog = this.closeDialog.bind(this);
    }

    onAuthorRemove(authorLink) {
        var that = this;
        var author = authorLink.value;
        this.manager.deleteAuthor(that.state.bookId, author.Id).then((response) => {
            var newauthors = that.state.authors.filter(i => i.Id !== author.Id);
            this.setState({ authors: newauthors });
            authorLink.remove();
        }).catch(function (error) {
            that.props.onError(error);
        });
    }

    closeDialog() {
        this.setState({ dialog: null });
    }

    openDialog(name, editing = null) {
        this.setState({ dialog: name, editing: editing });
    }

    render() {
        const authorsLink = this.linkAt('authors'),
            { dialog, editing } = this.state;

        var that = this;
        var authorsList = authorsLink.map(function (authorLink, i) {
            return <tr key={authorLink.value.Id}>
                <td>{authorLink.value.AuthorLastName}</td>
                <td>{authorLink.value.AuthorFirstName}</td>
                <td>
                    <button type="button" className="btn btn-default" onClick={() => that.openDialog('editAuthor', i)}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>
                    <button type="button" disabled={that.state.authors.length == 1} className="btn btn-default" onClick={() => that.onAuthorRemove(authorLink)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                </td>
            </tr>
        });
        return (
            <div>
                <div type="button" className="btn btn-default" onClick={() => this.openDialog('addAuthor')}>Create new author</div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authorsList}
                    </tbody>
                </table>
                <Modal isOpen={dialog === 'addAuthor'} contentLabel="Modal" style={customModalStyles}>
                    <EditAuthor authorLink={Link.value({}, x => authorsLink.push(x))} bookId={this.state.bookId} onError={this.props.onError}
                        onClose={this.closeDialog} />
                </Modal>

                <Modal isOpen={dialog === 'editAuthor'} contentLabel="Modal" style={customModalStyles}>
                    <EditAuthor authorLink={authorsLink.at(editing)} bookId={this.state.bookId} onError={this.props.onError}
                        onClose={this.closeDialog} />
                </Modal>
            </div >)
    }
}

class EditAuthor extends LinkedComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            AuthorLastName: '',
            AuthorFirstName: '',
            Id: null,
            BookId: this.props.bookId
        };

        this.manager = new ApiService();
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.setState(this.props.authorLink.value);
    }

    onSubmit(e) {
        e.preventDefault();
        var that = this;
        const { authorLink, onClose } = this.props;

        if (this.state.Id) {
            this.manager.updateAuthor(this.state).then((response) => {
                authorLink.set(that.state);
                onClose();
            }).catch(function (error) {
                that.props.onError(error);
            });
        } else {
                debugger;
            
            this.manager.createAuthor(this.state).then((response) => {
                that.setState({ Id: response.data }, function () {
                    authorLink.set(that.state);
                    onClose();
                })
            }).catch(function (error) {
                that.props.onError(error);
            });
        }        
    }

    onCancel() {
        this.props.onClose();
    }

    render() {
        const linked = this.linkAll();

        linked.AuthorFirstName
            .check(isRequired)
            .check(x => x.length <= 20, 'Author First Name is too long');

        linked.AuthorLastName
            .check(isRequired)
            .check(x => x.length <= 20, 'Author Last Name is too long');

        return (
            <div>
                <ValidatedInput id="authorFirstName" valueLink={linked.AuthorFirstName} label="Author First Name" />
                <ValidatedInput id="authorLastName" valueLink={linked.AuthorLastName} label="Author Last Name" />
                <div className="btn-group">
                    <button className="btn btn-primary"
                        type="submit"
                        value="Submit"
                        onClick={this.onSubmit}>
                        Save
                    </button>
                    <button className="btn btn-default" onClick={this.onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

export default AuthorsEdit;