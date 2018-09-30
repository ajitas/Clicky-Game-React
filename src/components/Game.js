import React from "react";
import Header from "./Header";
import friends from "../friends.json";
import "./style.css";

class Game extends React.Component {
    state = {
        pictures:friends,
        score:0,
        highscore:0,
        message:"",
        alreadyPicked :[]
    }

    componentDidMount() {
        const newPictures = this.shuffle(this.state.pictures);
        this.setState({pictures:newPictures});
      }

    handleClick = id => {
        const len= this.state.alreadyPicked.filter(idOfImage => idOfImage === id).length;
        const newPictures = this.shuffle(this.state.pictures);
        const newMessage= (len===0)?"Guessed Correctly":"Guessed Incorrectly";
        const newScore = (len===0)?this.state.score+1:0;
        const newAlreadyPicked = (len===0)?this.state.alreadyPicked.concat(id):[];
        const newHighScore = (len===0)?(this.state.highscore<newScore)?newScore:this.state.highscore:this.state.highscore;
        this.setState({message:newMessage, score:newScore, alreadyPicked:newAlreadyPicked, highscore:newHighScore, pictures:newPictures});
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
                <div className={`${this.state.message === "Guessed Incorrectly" ? "animated shake" : this.state.message === "" ?"animated fadeInUp":""}`}>
                    <div className="row game-heading">
                        <div className="col-md-12 text-center">
                            <span className="game-name">CLICKY GAME</span><p> Click on an image to earn points, but don't click on any more than once!</p>
                        </div>
                    </div>
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