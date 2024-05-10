import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage.js';
import ViewPokemon from './components/pages/ViewPokemon.js';
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/pokemon/:name" element={ <ViewPokemon />}/>
    </Routes>
  );
}

export default App;
