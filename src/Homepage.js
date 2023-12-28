import React from 'react';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {

    render() {
        return (
            <>
                <Link to="/viewer">Go to card viewer</Link>
                <br/>
                <Link to="/editor">Go to card editor</Link>
            </>
        );
    };

}

export default Homepage;