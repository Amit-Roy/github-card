import React from 'react';
import './App.css';
import axios from 'axios';

// Write JavaScript here and press Ctrl+Enter to execute
const Card = (props) => {
    return (
        <div>
            <img width="75" src={props.avatar_url} alt={""}/>
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
                    {props.name}
                </div>
                <div>
                    {props.company}
                </div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card}/>)}
        </div>
    )
};

class Form extends React.Component {

    state = {userName: ''};

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                    this.props.onSubmit(resp.data);
                    this.setState({userName: ''})
                }
            )
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text"
                               value={this.state.userName}
                               onChange={(event) => this.setState({userName: event.target.value})}
                               placeholder="Github UserName"/>
                        <button type="submit">Add Card</button>
                    </form>
                </header>
            </div>
        )
    }
}

class App extends React.Component {
    state = {
        cards: []
    };

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }))
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards={this.state.cards}/>
            </div>
        )
    }
}

export default App;
