import * as React from 'react';

enum Direction {N,S,E,W}

export interface SnakeProps {
  cols?: number;
  rows?: number;
  px?: number;
  onCollision?: ()=>any;
}

interface SnakeState {
  direction: Direction;
  snakePos: ReadonlyArray<Readonly<[number,number]>>;
  foodPos: Readonly<[number,number]>;
}

export class Snake extends React.Component <SnakeProps,SnakeState> {
  static readonly defaultProps: SnakeProps = {
    cols: 15,
    rows: 15,
    px: 10,
  }
  componentDidMount(){
    setInterval(this.step,90)
    document.addEventListener('keydown',(e)=>{
      if(e.code.indexOf('Arrow')!==0){return;}
      const { direction } = this.state;
      const inputDirection = e.code.split('Arrow')[1];
      switch(inputDirection){
        case 'Up':
          if(direction===Direction.S){return;}
          return this.setState({direction:Direction.N})
        case 'Down':
          if(direction===Direction.N){return;}
          return this.setState({direction:Direction.S})
        case 'Left':
          if(direction===Direction.E){return;}
          return this.setState({direction:Direction.W})
        case 'Right':
          if(direction===Direction.W){return;}
          return this.setState({direction:Direction.E})
      }
    },false)
  }
  constructor(props){
    super(props);
    if(this.props.cols < 10 || this.props.rows < 10){
      throw new Error('rows and cols must be larger than 10');
    }
    this.state = {
      direction: Direction.E,
      snakePos: [[2,4],[2,3],[2,2]],
      foodPos: [5,5],
    };
    this.step = this.step.bind(this);
    this.isGridFilled = this.isGridFilled.bind(this);
    this.nextHeadPos = this.nextHeadPos.bind(this);
    this.nextFoodPos = this.nextFoodPos.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
  }
  handleCollision(): void {
    if(this.props.onCollision){
      return this.props.onCollision();
    }
  }
  nextFoodPos(): [number,number] {
    return [Math.floor(Math.random()*(this.props.rows-1)), Math.floor(Math.random()*(this.props.cols-1))]
  }
  nextHeadPos(): [number,number] {
    const { direction, snakePos } = this.state;
    const currentPos = snakePos[0];
    switch(direction){
      case Direction.N:
        return [currentPos[0]-1,currentPos[1]]
      case Direction.S:
        return [currentPos[0]+1,currentPos[1]]
      case Direction.E:
        return [currentPos[0],currentPos[1]+1]
      case Direction.W:
        return [currentPos[0],currentPos[1]-1]
    }
  }
  step(){
    const { snakePos, foodPos } = this.state;
    const { cols, rows } = this.props;
    const nextPos = this.nextHeadPos();
    // Out of negative bounds
    if(nextPos[0] < 0 || nextPos[1] < 0){
      return this.handleCollision();
    }
    // Out of positive bounds
    if(nextPos[0] > rows-1 || nextPos[1] > cols-1){
      return this.handleCollision();
    }
    // Collided with self
    if(snakePos.findIndex(i=>(i[0]===nextPos[0])&&(i[1]===nextPos[1]))!==-1){
      return this.handleCollision();
    }
    // Collided with food
    const gotFood = Boolean(nextPos[0]===foodPos[0]&&nextPos[1]===foodPos[1])

    this.setState({
      snakePos: [nextPos].concat(snakePos.map((pos,i,o)=>i==0?pos:(o[i-1])).slice(gotFood?0:1)),
      foodPos: gotFood?this.nextFoodPos():foodPos,
    })
  }
  isGridFilled(row:number,col:number): boolean {
    const { snakePos } = this.state;
    return Boolean(snakePos.find(v=>(v[0]===row)&&(v[1]===col)));
  }
  isGridFood(row:number,col:number): boolean {
    const { foodPos } = this.state;
    return Boolean(foodPos[0]===row&&foodPos[1]===col);
  }
  render(){
    const { props} = this;
    return (
      <table style={{borderCollapse:'collapse',borderSpacing:0}}>
        <tbody>
          {new Array(props.rows).fill({}).map(({},ri)=>(
            <tr key={ri}>
              {new Array(props.cols).fill({}).map(({},ci)=>(
                <td key={`${ci}-${ri}`} style={{padding:0,margin:0,border:'1px solid black',width:`${props.px}px`,height:`${props.px}px`}}>
                  {this.isGridFilled(ri,ci)?(
                    <div style={{width:'100%',height:'100%',backgroundColor:'blue'}}>
                    </div>
                  ):(this.isGridFood(ri,ci)?(
                    <div style={{width:'100%',height:'100%',backgroundColor:'orange'}}>
                    </div>
                  ):null)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Snake;
