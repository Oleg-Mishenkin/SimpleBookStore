import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h4>Update services in background</h4>
            </div>);
    }
}

render(<App />, document.getElementById('app'));