/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="App">
      <h1>Find these Characters!</h1>
      <div className="characters">
        <img src="/broccoli.png" className="character"></img>
        <img src="/carrot.png" className="character"></img>
        <img src="/chicken.png" className="character"></img>
        <img src="/sun.png" className="character"></img>
      </div>
      <GameBoard />
    </div>
  );
}

export default App;
