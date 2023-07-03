import React, { useState, useEffect } from 'react';
import './App.css';
import FetchingComponent from './fetchingComponent';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header>Pokemon API fetching application</header>
      <p>This is a work on progress. The goal is to show all the first 151 pokemon, on individual cards, with data like its type, weight, height, and ability.</p>
      <FetchingComponent />
    </div>
  );
}

export default App;
