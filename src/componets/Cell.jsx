import React from 'react';
import { mineColor } from "../util/mineColors";
import "../App.css";
import Circle from "./Circle";

export default function Cell({details,updateFlag,revealCell}){

    const style={
       background:details.revealed
       ? details.value ==="X"
       ? mineColor()
       :bombChexPattern(details.x,details.y)
       :chexPattern(details.x,details.y), 
       color:numColorCode(details.value),
    }

    return(
         <div  
         onContextMenu={(e) => updateFlag(e,details.x,details.y)} 
         onClick={() => revealCell(details.x,details.y)}
         style={style}
         className="cellStyle"
         >
            {!details.revealed && details.flagged ? "🏴‍☠" :details.revealed && details.value !== 0 ? (details.value==='X' ? <Circle />:details.value)  :("")}
        </div>
        );


        
}
//Destapadas
const bombChexPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
      return "black";
    } else if (x % 2 === 0 && y % 2 !== 0) {
      return "gray";
    } else if (x % 2 !== 0 && y % 2 === 0) {
      return "gray";
    } else {
      return "black";
    }
  };
 //Tapadas 
  const chexPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
      return "#810000";
    } else if (x % 2 === 0 && y % 2 !== 0) {
      return "#ce1212";
    } else if (x % 2 !== 0 && y % 2 === 0) {
      return "#ce1212";
    } else {
      return "#810000";
    }
  };
//ColorNumeros
  const numColorCode = (num) => {
    if (num === 1) {
      return "white";
    } else if (num === 2) {
      return "#388d3c";
    } else if (num === 3) {
      return "810000";
    } else if (num === 4) {
      return "#7c21a2";
    } else if (num === 5) {
      return "#1976d2";
    } else if (num === 6) {
      return "#1976d2";
    } else {
      return "pink";
    }
  };