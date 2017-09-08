import React, { PropTypes } from 'react';

class Edit extends React.Component {
    render() {
        return (
          <div>
                <h2>{this.props.match.params.id}</h2>
          </div>
        );
    }
}

export default Edit;