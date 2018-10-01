import React from "react";
import Header from "./Header";
import Row from "./Row";
import Col from "./Col";
import Container from "./Container";
import Span from "./Span";
import Paragraph from "./Paragraph";
import friends from "../friends.json";
import "./style.css";

class Game extends React.Component {
    state = {
        allPictures:friends,
        pictures:friends.slice(0,8),
        score:0,
        highscore:0,
        message:"Click to Start!",
        alreadyPicked :[]
    }

    componentDidMount() {
        const newPictures = this.shuffle(this.state.allPictures);
        this.setState({pictures:newPictures});
    }

    handleClick = id => {
        const len= this.state.alreadyPicked.filter(idOfImage => idOfImage === id).length;
        const newAlreadyPicked = (len===0)?this.state.alreadyPicked.concat(id):[];
        const newScore = (len===0)?this.state.score+1:0;
        if(newScore<12){
            this.setState({alreadyPicked:newAlreadyPicked},
                () => { 
                    let that = this;
                    (function loop(){
                        let newPictures = that.shuffle(that.state.allPictures); 
                        if(newPictures.length===0)
                            loop();
                        else
                            that.setState({pictures:newPictures})
                    }());   
                }
            );
            
            const newMessage= (len===0)?"Guessed Correctly":"Guessed Incorrectly";
            const that = this;
            (function() {
                if(newMessage === "Guessed Incorrectly"){
                    setTimeout(()=> {
                        that.setState({message:"Click to start again!"});
                    }, 1000);
                }
            }());
            
            const newHighScore = (len===0)?(this.state.highscore<newScore)?newScore:this.state.highscore:this.state.highscore;
            this.setState({message:newMessage, score:newScore, highscore:newHighScore});
        }
        else {
            const that = this;
            that.setState({message:"You won!Game resetting..",score:12, highscore:12 });
            (function() {
                setTimeout(()=> {
                    that.setState({message:"Click to Start!",score:0,allPictures:friends,alreadyPicked :[]},
                        ()=>{
                            const newPictures = that.shuffle(that.state.allPictures);
                            that.setState({pictures:newPictures});
                        }
                    );
                }, 2000);   
            }());
        }
    }

    shuffle = arr =>{
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        for(let j=0;j<8;j++){
            const len = this.state.alreadyPicked.filter(id=> id===arr[j].id).length;
            if(len===0)
                return arr.slice(0,8);
        }
        return [];
        
    }

    render(){
        return (
                <Container cls={`${this.state.message === "Guessed Incorrectly" ? "animated shake" : this.state.message === "Click to Start!" ?"animated fadeInUp": this.state.message ==="You won!Game resetting.."?"animated flash":""}`}>
                    <Row cls="game-heading">
                        <Col size="md-12">
                            <Span cls="game-name">CLICKY GAME</Span>
                            <Paragraph> Click on an image to earn points, but don't click on any more than once!</Paragraph>
                        </Col>
                    </Row>
                    <Header message={this.state.message} score={this.state.score} highscore={this.state.highscore} />
                    <Row cls="game-area">
                        <Col size="md-1"></Col>
                        <Col size="md-10">
                            {this.state.pictures.map((pic => <img key={pic.id} alt={pic.name} src={pic.image} onClick={()=>this.handleClick(pic.id)}/>))}
                        </Col>
                        <Col size="md-1"></Col>
                    </Row>
                </Container>
        );
    }
}
export default Game;