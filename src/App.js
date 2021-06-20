import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { ComicProvider } from './providers/ComicProvider';
import logo from './logo.svg';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
      <Router>
        <ComicProvider>
          <div className="main">
            <ApplicationViews />
          </div>
        </ComicProvider>
      </Router>
  );
}

export default App;
