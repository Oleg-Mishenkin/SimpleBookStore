import React, { PropTypes } from 'react';
import StorageService from '../common/storageService';

class SortableHeader extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.storageService = new StorageService();
        this.state = {
            sortAsc: true
        }

        this.onHeaderClick = this.onHeaderClick.bind(this)
    }

    componentDidMount() {
        var sortObj = this.storageService.getSortProp();
        if (sortObj && sortObj.sortProp == this.props.sortProp) {
            this.setState({ sortAsc: sortObj.sortAsc });
            this.props.onSortChanged(sortObj.sortProp, sortObj.sortAsc);
        }
    }

    onHeaderClick(evt) {
        this.setState({ sortAsc: !this.state.sortAsc }, function () {
            this.storageService.setSortProp(this.props.sortProp, this.state.sortAsc);
            this.props.onSortChanged(this.props.sortProp, this.state.sortAsc);
        });

    }

    render() {
        var arrowClass = this.state.sortAsc ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down'
        return (<th>
            <span className='sortable-header' onClick={this.onHeaderClick}>{this.props.sortProp}</span>&nbsp;
            {this.props.activeHeader == this.props.sortProp && <span className={arrowClass} aria-hidden="true"></span>}
        </th>)
    }
}

export default SortableHeader;