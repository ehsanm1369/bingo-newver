/* eslint-disable array-callback-return */
import React, { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";


function Confettishown() {
   
  return (
    <div>
          <Confetti />
    </div>

  );
}




const cellData = [
  "hello hello",
  "there is noise",
  "poor connection",
  "unable to connect",
  "unable to see scrren",
  "there is need to jump another call",
  "can you email that to all",
  "can somebody grant ",
  "sorry I didnt found confrance Id",
  "noise in the background",
  "poor connection",
  "can we take this offline",
  "lets join",
  "I need to drop",
  "there is need to jump another call",
  "can you email that to all",
  "can somebody grant ",
  "sorry I didnt found confrance Id",
  "can you reapet please",
  "I was mute",
  "there is noise",
  "sorry something is wrong",
  "I was mute",
  "who just joined",
  "can you send",
];

//get a cell random data
const cellRandomData = () => {
  var randomIndex = Math.floor(Math.random() * cellData.length);
  return cellData[randomIndex];
};

// fill array with random data
const randomData = cellData
  .map(() => cellRandomData())
  .reduce(
    (data, value, index) => ({
      ...data,
      [index]: value,
    }),
    {}
  );

function Cell({ id, children, onToggle, isSet }) {
  return (
    <div id={`div${id}`} onClick={onToggle} className={`grid ${isSet ? "clicked" : ""}`}>
      {id !== "12" ? children : "CONF CALL 😷 BINGO"}
      {id !== "12" ? <p className="p">{id}</p> : null}
    </div>
  );
}

function App() {
  const [state, setState] = useState({ checked: { 12: true }, checked2: { 12: true } });

  const winLines = [
    {seri: [0, 1, 2, 3, 4], win : false},
    {seri: [5, 6, 7, 8, 9], win : false},
    {seri: [10, 11,12, 13, 14], win : false},
    {seri: [15, 16, 17, 18, 19], win : false},
    {seri: [20, 21, 22, 23, 24], win : false},
    {seri: [0, 5, 10, 15, 20], win : false},
    {seri: [1, 6, 11, 16, 21], win : false},
    {seri: [2, 7,12, 17, 22], win : false},
    {seri: [3, 8, 13, 18, 23], win : false},
    {seri: [4, 9, 14, 19, 24], win : false},
    {seri: [0, 6, 12, 18, 24], win : false},
    {seri: [4, 8, 12, 16, 20], win : false}
  ];

  const bingo = (checked2) => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find((row) =>
          range.every((column) => checked2[row * 5 + column])
        ) ||
      undefined !==
        range.find((column) =>
          range.every((row) => checked2[row * 5 + column])
        ) ||
      range.every((index) => checked2[index * 5 + index]) ||
      range.every((index) => checked2[index * 5 + 4 - index])
    );
  };
  const toggle = (id) =>
 
    setState((state) => { 
      const checked = { ...state.checked, [id]: !state.checked[id] };
      var checked2 = { ...state.checked2, [id]: !state.checked2[id] };
      var winner = bingo(checked2); 
      //console.log(winner);
      if(winner===true) {
        checked2 = { 12: true };
      }


        console.log(id);
        //var val = winLines.map(x => x.seri.find(elm => elm === parseInt(id)));
        var line = winLines.map(x => x.seri.map(el =>{
          if(el === parseInt(id)){
  
            return x.seri;
  
          }
        })).map(x => x.filter(a => a !== undefined)).filter(res => res.length > 0)
      //line = line.map(x => x.filter(a => a !== undefined)).filter(res => res.length > 0)
      
      console.log(checked);
        //console.log(line);
        //var matchCount = 0;
        
        

         
          if(line.length > 0){

            line.map(arr => {
              var matchCount = 0;
              arr.map(val => val.map(elm => {
                Object.keys(checked).includes((elm).toString()) ? matchCount+=1 : matchCount+=0
                  console.log(`matchCount is: ${matchCount}`);
                  if(matchCount>4) {
                    winner = true
                  }
              }))
            });
            //.find(val => val === parseInt(x))
          }
      
       


 
      
      console.log(winner)
      return {
        ...state,
        checked,
        checked2,
        winner
      };
    });

  return (
    <div>
      <div className="container">
        <h1>BINGO GAME</h1>
        <div className="wrapper">
          {Object.keys(randomData).map((id) => (
            <Cell
              key={id}
              id={id}
              isSet={!!state.checked[id]}
              onToggle={() => toggle(id)}
            >
              {randomData[id]}
            </Cell>
          ))}
        </div>
      </div>
      {state.winner ?  <Confettishown /> : null}
     
    </div>
  );
  
}

export default App;
