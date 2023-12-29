import React from 'react';
import './CardViewer.css';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { index: 0, displayFront: true};
    };
    
    goBack = () => {
        if (this.state.index === 0) {
            return;
        } else {
            this.setState( { index : this.state.index - 1, displayFront: true} );
        }
    };

    goForward = () => {
        if (this.state.index === (this.props.cards.length - 1)) {
            return;
        } else {
            this.setState( { index : this.state.index + 1, displayFront : true } );
        }
    };

    flipCard = () => {
        this.setState({displayFront : !this.state.displayFront});
    };

    render() {

        if (!isLoaded(this.props.cards)) {
            return <div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page not found</div>;
        }

        const card = this.props.cards[this.state.index][this.state.displayFront ? 'front' : 'back'];

        return (
            <div>
                <h2>{this.props.name}</h2>
                <p>{this.state.index + 1}/{this.props.cards.length}</p>
                <div className='card' onClick={this.flipCard}>
                    {card}
                </div>
                <br/>
                <button onClick={this.goBack}>Previous</button>
                <button onClick={this.goForward}>Next</button>
                <br/>
                <Link to="/">Go Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return{ cards, name };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        const deckId = props.match.params.deckId;
        return [{path: `/flashcards/${deckId}`, storeAs: `${deckId}`}]
    }),
    connect(mapStateToProps),
)(CardViewer);