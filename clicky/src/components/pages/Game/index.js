import React, { Component } from 'react';

// Importing Components
import Navbar from '../../dumb/Navbar';
import Card from '../../smart/Card';

// Importing Card Data
import cardData from "../../assets/data/cardData";

// Importing CSS
import './Game.css';

class Game extends Component{
    state = {
        allCards: [],
        score: 0,
        topScore: 0,
        status: "Click an image to begin!"
    }

    componentDidMount(){
        console.log("Game.js did mount");
        
        this.setState({
            allCards: cardData
        })

    }

    shuffle = (arr) => {
        let newArr = arr;

        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        
        return newArr;
    }

    handleClick = (item) => {
        let gameLost = item.clicked;
        item.clicked = true;

        const shuffledCards = this.shuffle(this.state.allCards);

        if (!gameLost) {
            const newScore = this.state.score + 1;
            this.setState({
                score: newScore,
                topScore: newScore > this.state.topScore 
                            ? newScore
                            : this.state.topScore,
                allCards: shuffledCards,
                status: "You guessed correctly"
            })
        } else {
            // shuffle and reset clicked values
            shuffledCards.forEach(item => item.clicked = false);

            this.setState({
                allCards: shuffledCards,
                score: 0,
                status: "You guessed incorrectly!"
            })
        }
    }

    render(){
        return(
            
            <div className="game-page">
                {/* Navbar */}
                <Navbar 
                    status={this.state.status}
                    score={this.state.score}
                    topScore={this.state.topScore}
                />

                {/* Title */}
                <div className="game-title">
                    <div className="game-title-header" >Clicky Game!</div>
                    <div className="game-title-description">
                        Click on an image to earn points, but don't click on any more than once!
                    </div>
                </div>

                {/* Game Area */}
                <div className="game-area">
                    <div className="game">
                        {this.state.allCards.map(item => {
                            return (
                                <Card 
                                    key={item.id}
                                    click={this.handleClick}
                                    obj={item}
                                />
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default Game;