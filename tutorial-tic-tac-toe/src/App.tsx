import React from 'react';
import './App.css';
import SquareBoard from './components/SquareBoard';

function App() {
  return (
    <div className="App">
      <SquareBoard rows={200} />
    </div>
  );
}

export default App;
