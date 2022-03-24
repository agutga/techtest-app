
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Main } from './pages/main';
import { LinkStatistics } from './pages/link-statistics';
import { ShortenedUrl } from "./pages/shortened-url";

function App() {  
  return (    
    <Router>
      <Routes>
        <Route path="/" element={ <Main />} />        
        <Route path="/statistics/:id" element={ <LinkStatistics /> } />
        <Route path="/:shortenedUrl" element={ <ShortenedUrl /> } />
      </Routes>
    </Router>    
  );
}

export default App;
