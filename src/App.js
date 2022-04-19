import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeOne from './pages/HomeOne';
import HomeTwo from './pages/HomeTwo';
import Home from './pages/Home';
import SearchView from './pages/SearchView';
import { RecoilRoot } from 'recoil';
const App = () => {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/one' element={<HomeOne />} />
            <Route path='/search' element={<SearchView />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
