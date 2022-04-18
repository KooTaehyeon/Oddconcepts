import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeOne from './pages/HomeOne';
import HomeTwo from './pages/HomeTwo';
import Home from './pages/Home';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/one' element={<HomeOne />} />
          <Route path='/two' element={<HomeTwo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
