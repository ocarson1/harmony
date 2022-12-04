import React from 'react';
import Map from './Map'
import './styles/App.css'; 
import Sidebar from './Sidebar'


function App() {
  return (
    <div className="App">
      <div className="web-container">
        <Map />
        <Sidebar /> 
      </div>
    </div>
  );
}

export default App;
