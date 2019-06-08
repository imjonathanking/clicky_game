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

    handleClick = (clickedId) => {
        console.log(`Clicked id: ${clickedId}`);

        const cards = this.state.allCards;

        this.gameLost = false;

        // Iterate through each object in the state.allCards array
        const newCards = cards.map(item => {
            // If the click object's id matches the current item in the array's id
            if(item.id === clickedId){
                // If object has been clicked before
                if(item.clicked === true){
                    console.log(`${item.name} has been clicked before`);
                    this.gameLost = true;
                }

                // change "clicked" to true on object, and add it to the array
                const newCard = {...item, clicked: true}
                return newCard
            }
            return item;
        })

        const shuffledCards = this.shuffle(newCards);
        console.log(shuffledCards);

        console.log(`Game Lost: ${this.gameLost}`);
        // console.log(newCards);

        // If this object has not been clicked before
        if(this.gameLost === false){

            // this.setState({
            //     score: this.state.score + 1,
            //     topScore: this.state.score > this.state.topSore 
            //                 ? this.state.score
            //                 : this.state.topScore
            // })

            this.setState(prevState => {
                console.log("PrevState score: " + prevState.score);
                let newScore = prevState.score + 1;
                let topScore = prevState.topScore;

                if(newScore > topScore){
                    topScore = newScore
                }

                // Updating state
                return({
                    score: newScore,
                    allCards: shuffledCards,
                    topScore: topScore,
                    status: "You guessed correctly!"
                })

            },function(){
                console.log("Set state, correct guess");
                console.log(this.state);
            })
        }
        // If this object has not been clicked before
        else{
            this.setState({
                allCards: cardData,
                score: 0,
                status: "You guessed incorrectly!"
            }, function(){
                console.log(`id: ${clickedId} has been clicked before, updated state:`);
                console.log(this.state);
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