import logo from './logo.svg';
import './App.css';
import hashString from '../../utilities/hash/jenkinsHash';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p></p>
        <input id='input'>
        </input>
        <button onClick={() => {
          document.getElementById('texto').innerHTML = hashString(document.getElementById('input').value);

        }}>Hash</button>
        <p id='texto'>
          Texto
        </p>
        <p> Fecha: {Date()}</p>
      </header>
    </div>
  );
}

export default App;
