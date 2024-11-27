import './App.css';
import { Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Home from './components/Home'; 
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<Products/>}/>
      </Routes>

    </div>
  );
}

export default App;
