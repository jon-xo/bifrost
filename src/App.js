import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { ComicProvider } from './providers/ComicProvider';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <Router>
        <ComicProvider>
          <ApplicationViews />
        </ComicProvider>
      </Router>
  );
}

export default App;
