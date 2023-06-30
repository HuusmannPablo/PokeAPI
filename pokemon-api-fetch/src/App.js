import './App.css';
import FetchingComponent from './fetchingComponent';

function App() {
  return (
    <div className="App">
      <header>Pokemon API fetching application</header>
      <p>This is a work on progress. The goal is to show all the first 151 pokemon, on individual cards, with data like its type, weight, height, and ability.</p>
      <FetchingComponent />
    </div>
  );
}

export default App;
