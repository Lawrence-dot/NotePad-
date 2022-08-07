import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../Components/Home/Home.jsx";
import Count from "../Components/Home/Count.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Count/:CountId" element={<Count />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
