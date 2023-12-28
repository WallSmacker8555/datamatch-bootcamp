import React from 'react';
import './CardViewer.css';
import { Link } from 'react-router-dom';

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

        const card = this.props.cards[this.state.index][this.state.displayFront ? 'front' : 'back'];

        return (
            <div>
                <h2>Card Viewer</h2>
                <p>{this.state.index + 1}/{this.props.cards.length}</p>
                <div className='card' onClick={this.flipCard}>
                    {card}
                </div>
                <br/>
                <button onClick={this.goBack}>Previous</button>
                <button onClick={this.goForward}>Next</button>
                <br/>
                <Link to="/editor">Go to card editor</Link>
            </div>
        );
    }
}

export default CardViewer;