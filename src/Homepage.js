import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {

        if (!isLoaded(this.props.decks)) {
            return <div>Loading...</div>
        }

        if (isEmpty(this.props.decks)) {
            return (
                <>
                    <h2>Homepage</h2>
                    <Link to="/editor">Creat new deck</Link>
                    <br/>
                    <h3>No Available Decks</h3>
                </>
            );
        }

        const decks = Object.keys(this.props.decks).map(deckId => {
            const deck = this.props.decks[deckId];
            return (
                <div key={deckId}>
                    <Link to={`/viewer/${deckId}`}>{deck.name}</Link>
                </div>
            )
        });

        return (
            <>
                <h2>Homepage</h2>
                <Link to="/editor">Creat new deck</Link>
                <br/>
                <h3>Available Decks</h3>
                {decks}
            </>
        );
    };

}

const mapStateToProps = state => {
    return { decks: state.firebase.data.homepage};
}

export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
)(Homepage);