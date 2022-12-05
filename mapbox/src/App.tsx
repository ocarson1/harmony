import React, {useState} from 'react';
import Map from './Map'
import './styles/App.css'; 
import Sidebar from './Sidebar'



function App() {
  const [theme, setTheme] = useState(false);

  return (
    <div className="App">
      <div className="web-container">
        <Map theme={theme} setTheme={setTheme}/>
        <Sidebar theme={theme} setTheme={setTheme}/> 
      </div>
    </div>
  );
}

export default App;
