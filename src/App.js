
import React, { useState } from 'react';
import './App.css';
import HomePage from './pagge/HomePage/HomePage';
import { BrowserRouter, Routes, Route, useLocation, RouterProvider } from "react-router-dom";
import StartPage from './pagge/StartPage/StartPage';
import DataContext from "./context";
import Magazin from './pagge/Magazin/Magazin';

function App() {
  const [scope, setScope] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const ContextData = {
    setScope,
    scope,
    setAnsweredQuestions,
    answeredQuestions
  }
  return (
      <DataContext.Provider
      value={{
       ContextData
      }}
    >
      <BrowserRouter>
        <main className="App">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Magazin" element={<Magazin />} />
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  
  );
}

export default App;
