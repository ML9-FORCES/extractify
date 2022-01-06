import React, { createContext, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Display from './pages/Display/Display';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';

export const ContextImage = createContext(null);
function App() {

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const value = useMemo(
    () => ({ selectedImageFile, setSelectedImageFile }),
    [selectedImageFile]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="" element={<ContextImage.Provider value={value}><Home /></ContextImage.Provider>} />
        <Route path="/display" element={<ContextImage.Provider value={value}><Display /></ContextImage.Provider>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
