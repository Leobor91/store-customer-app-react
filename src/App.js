import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Product from './components/Product';import './App.css'; // Importar el archivo CSS

const App = () => {
  return (
    <Router>
      <div>
        <ul className="nav-menu">
          <li><Link to="/product"><i className="fas fa-box"></i> Productos</Link></li>          
        </ul>
        <div className="main-container">
          <Routes>
            <Route path="/product" element={<Product />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;