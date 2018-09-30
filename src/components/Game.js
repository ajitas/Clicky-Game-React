import React from "react";
import Header from "./Header";
import friends from "../friends.json"
import "./style.css";

class Game extends React.Component {
    state = {
        pictures:friends,
        score:0,
        highscore:0,
        message:"Click on an image to begin!",
        alreadyPicked :[]
    }

    handleClick = id => {
        const len= this.state.alreadyPicked.filter(idOfImage => idOfImage === id).length;
        const newArr = this.shuffle(this.state.pictures);
        const message1= (len===0)?"Guessed Correctly":"Guessed Incorrectly";
        const score1 = (len===0)?this.state.score+1:0;
        const newAlreadyPicked = (len===0)?this.state.alreadyPicked.concat(id):[];
        const highscore1 = (len===0)?(this.state.highscore<score1)?score1:this.state.highscore:this.state.highscore;
        this.setState({message:message1,score:score1, alreadyPicked:newAlreadyPicked, highscore:highscore1, pictures:newArr});
    }

    shuffle = arr =>{
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }

    render(){
        return (
            <div>
                <Header message={this.state.message} score={this.state.score} highscore={this.state.highscore} />
                <div className="row game-area">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        {this.state.pictures.map((pic => <img key={pic.id} alt={pic.name} src={pic.image} onClick={()=>this.handleClick(pic.id)}/>))}
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        );
    }

}

export default Game;