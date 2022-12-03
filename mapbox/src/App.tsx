import React from 'react';
import MapDemo from './MapDemo'
import './styles/App.css'; 
import Sidebar from './Sidebar'


function App() {
  return (
    <div className="App">
      <div className="web-container">
        <MapDemo />
        <Sidebar /> 
      </div>
    </div>
  );
}

export default App;
