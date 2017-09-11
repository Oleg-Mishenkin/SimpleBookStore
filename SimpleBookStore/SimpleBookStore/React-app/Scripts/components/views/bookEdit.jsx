import React, { PropTypes } from 'react';
import { Link as RouteLink, withRouter } from 'react-router-dom';
import Link, { LinkedComponent } from 'valuelink';
import { ValidatedInput } from '../views/formInput';
import { isRequired, isISBN } from '../libs/linkTags';

const BookEdit = ({ title, pages, publisher, publishDate, isbn }) => {
    title
        .check(isRequired)
        .check(x => x.length <= 30, 'Title is too long');

    pages
        .check(isRequired)
        .check(x => x <= 10000 && x > 0, 'Pages should be between 1 and 10000');

    publisher
        .check(isRequired)
        .check(x => x.length <= 30, 'Publisher is too long');

    publishDate
        .check(isRequired)
        .check(x => {
            return new Date(x) >= new Date(1800, 0, 1);
        }, 'Publish Date should be greater than 1800 year');

    isbn
        .check(isRequired)
        .check(isISBN, 'ISBN should meet requirements');

    return (<div>
        <ValidatedInput id="title" valueLink={title} label="Book title" />
        <ValidatedInput id="pages" valueLink={pages} label="Pages" isNumeric='true' />
        <ValidatedInput id="publisher" valueLink={publisher} label="Publisher" />
        <ValidatedInput id="publishDate" valueLink={publishDate} label="Publish Date" type="date" />
        <ValidatedInput id="isbn" valueLink={isbn} label="ISBN" />
    </div>)
}

export default BookEdit;