import * as React from 'react';
import Snake from './Snake';

interface GameState {
  running: boolean;
  rows: number;
  cols: number;
  stepInterval: number;
}

export class Game extends React.Component <{},GameState> {
  constructor(props){
    super(props);
    this.state = {
      running: false,
      rows: 20,
      cols: 20,
      stepInterval: 90,
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
    const { state } = this;
    if(state.running){
      return <Snake cols={state.cols} rows={state.rows} stepInterval={state.stepInterval} onCollision={this.endGame}/>
    }
    return (
      <div>
        <div>
          Rows: <input type="number" min={5} value={state.rows} onChange={e=>this.setState({rows:Math.floor(Number(e.target.value))})}/>
        </div>
        <div>
          Cols: <input type="number" min={5} value={state.cols} onChange={e=>this.setState({cols:Math.floor(Number(e.target.value))})}/>
        </div>
        <button onClick={this.startGame}>Start</button>
      </div>
    )
  }
}

export default Game;
