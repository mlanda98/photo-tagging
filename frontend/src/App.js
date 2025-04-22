/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="App">
      <h1>Find these Characters!</h1>
      <div className="characters">
        <img src="/broccoli.png" className="character" alt="broccoli"></img>
        <img src="/carrot.png" className="character" alt="carrot"></img>
        <img src="/chicken.png" className="character" alt="chicken"></img>
        <img src="/sun.png" className="character" alt="sun"></img>
      </div>
      <GameBoard />
    </div>
  );
}

export default App;
