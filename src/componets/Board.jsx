import React, {useEffect, useReducer } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";

const reducer = (grid,action) =>{
   if(action.type === "SET"){
     return action.payload;
   }
}

const reducer1 = (grid,action) =>{
  if(action.type === "SET"){
    return 15*15-20;
  }
  if(action.type ==="SETNON"){
    return action.payload;
  }
}

const reducer2 =(grid,action)=>{
  if(action.type ==="SET"){
    return action.payload;
  }
}

const reducer3=(grid,action)=>{
  if(action.type === "SETF"){
    return false;
  }
  if(action.type === "SETT"){
    return true;
  }
}

const Board = () => {
  //const [grid, setGrid] = useState([]);
  const [grid,dispatch]= useReducer(reducer,[]);

  //const [nonMineCount, setNonMineCount] = useState(0);
  const [nonMineCount,dispatch1]=useReducer(reducer1,0);

  //const [mineLocations, setMineLocations] = useState([]);
  const [mineLocations,dispatch2]=useReducer(reducer2,[]);

  //const [gameOver, setGameOver] = useState(false);
  const[gameOver,dispatch3]=useReducer(reducer3,false);
  // ComponentDidMount
  useEffect(() => {
    // Creating a board

    // Calling the function
    freshBoard();
  }, []);

  const freshBoard = () => {
    const newBoard = createBoard(15, 15, 20);
    dispatch1({type:"SET"})

    //setMineLocations(newBoard.mineLocation);
    dispatch2({type:"SET",payload:newBoard.mineLocation})

    //setGrid(newBoard.board);
    dispatch({type:"SET",payload:newBoard.board});
  };

  const restartGame = () => {
    freshBoard();
    //setGameOver(false);
    dispatch3({type:"SETF"});
  };

  // On Right Click / Flag Cell
  const updateFlag = (e, x, y) => {
    // to not have a dropdown on right click
    e.preventDefault();
    // Deep copy of a state
    let newGrid = JSON.parse(JSON.stringify(grid));
    console.log(newGrid[x][y]);
    newGrid[x][y].flagged = true;
    //setGrid(newGrid);
    dispatch({type:"SET",payload:newGrid});
  };

  // Reveal Cell
  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      //setGrid(newGrid);
      dispatch({type:"SET",payload:newGrid});
      //setGameOver(true);
      dispatch3({type:"SETT"})
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      //setGrid(newRevealedBoard.arr);
      dispatch({type:"SET",payload:newRevealedBoard.arr});
      //setNonMineCount(newRevealedBoard.newNonMinesCount);
      dispatch1({type:"SETNON",payload:newRevealedBoard.newNonMinesCount})


      if (newRevealedBoard.newNonMinesCount === 0) {
        //setGameOver(true);
        dispatch3({type:"SETT"})
      }
    }
  };

  return (
    <div>
      <p>Casilla Libres:{nonMineCount}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {gameOver && <Modal restartGame={restartGame} />}
        {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;