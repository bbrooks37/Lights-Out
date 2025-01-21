import React from 'react';
import Board from './Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lights Out</h1>
      <Board size={3} difficulty={0.3} /> 
    </div>
  );
}

export default App;