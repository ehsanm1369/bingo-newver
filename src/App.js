import React, { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";


function Confettishown() {
   
  return (
    <div>
          <Confetti recycle={false}/>
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
  const [state, setState] = useState({ checked: { 12: true } });

  const bingo = (checked) => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find((row) =>
          range.every((column) => checked[row * 5 + column])
        ) ||
      undefined !==
        range.find((column) =>
          range.every((row) => checked[row * 5 + column])
        ) ||
      range.every((index) => checked[index * 5 + index]) ||
      range.every((index) => checked[index * 5 + 4 - index])
    );
  };
  const toggle = (id) =>
 
    setState((state) => { 
      const checked = { ...state.checked, [id]: !state.checked[id] };
      var winner = bingo(checked); 
      return {
        ...state,
        checked,
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
      {state.winner ?  <Confettishown /> : null

      }
    </div>
  );
  
}

export default App;
