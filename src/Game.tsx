import * as React from 'react';
import Snake from './Snake';

interface GameState {
  startPaused: boolean;
  running: boolean;
  paused: boolean;
  rows: number;
  cols: number;
  stepInterval: number;
  snakeColor: string;
  foodColor: string;
}

export class Game extends React.Component <{},GameState> {
  constructor(props){
    super(props);
    this.state = {
      startPaused: false,
      running: false,
      paused: false,
      rows: 20,
      cols: 20,
      stepInterval: 90,
      snakeColor: '#0000ff',
      foodColor: '#ffa500',
    };
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown',this.handleKeyboard,false);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown',this.handleKeyboard,false);
  }
  handleKeyboard(e:KeyboardEvent){
    switch(e.code){
      case 'Escape':
        return this.endGame();
      case 'KeyP':
        return this.togglePause();
    }
  }
  startGame(){
    this.setState({running:true,paused:this.state.startPaused});
  }
  endGame(){
    this.setState({running:false,paused:false});
  }
  /**
   * Toggle the paused state of the running game
   * Does nothing if no game running
   */
  togglePause(){
    // Do nothing if not running
    if(!this.state.running){return;}
    this.setState({paused:!this.state.paused})
  }
  render(){
    const { state } = this;
    if(state.running){
      return (
        <div>
          <Snake
            paused={this.state.paused}
            foodColor={state.foodColor}
            snakeColor={state.snakeColor}
            cols={state.cols} rows={state.rows}
            stepInterval={state.stepInterval}
            onCollision={this.endGame}
          />
          {this.state.paused?(
            <div>
              <span style={{fontWeight:'bold'}}>Paused</span>
              <br/>
              <span style={{fontStyle:'italic'}}>Press 'P' to resume</span>
            </div>
          ):null}
        </div>
      )
    }
    return (
      <form onSubmit={e=>{e.preventDefault();this.startGame()}}>
        <div>
          Rows: <input type="number" min={5} value={state.rows} onChange={e=>this.setState({rows:Math.floor(Number(e.target.value))})}/>
        </div>
        <div>
          Cols: <input type="number" min={5} value={state.cols} onChange={e=>this.setState({cols:Math.floor(Number(e.target.value))})}/>
        </div>
        <div>
          Snake: <input type="color" value={this.state.snakeColor} onChange={e=>this.setState({snakeColor:e.target.value})}/>
          {' '}
          Food : <input type="color" value={this.state.foodColor} onChange={e=>this.setState({foodColor:e.target.value})}/>
        </div>
        <div>
          Start Paused: <input type="checkbox" onChange={()=>this.setState({startPaused:!this.state.startPaused})} checked={this.state.startPaused}/>
        </div>
        <button type="submit">Start</button>
      </form>
    )
  }
}

export default Game;
