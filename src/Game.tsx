import * as React from 'react';
import Snake from './Snake';

interface GameState {
  running: boolean;
}

export class Game extends React.Component <{},GameState> {
  constructor(props){
    super(props);
    this.state = {
      running: false,
    };
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }
  startGame(){
    this.setState({running:true})
  }
  endGame(){
    this.setState({running:false});
  }
  render(){
    if(this.state.running){
      return <Snake onCollision={this.endGame}/>
    }
    return (
      <div>
        <button onClick={this.startGame}>Start</button>
      </div>
    )
  }
}

export default Game;
