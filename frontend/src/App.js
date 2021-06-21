import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { ComicProvider } from './providers/ComicProvider';
import { SearchComicProvider } from './providers/SearchComicProvider';
import logo from './logo.svg';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
      <Router>
        <ComicProvider>
          <SearchComicProvider>
            <div className="main">
              <ApplicationViews />
            </div>
          </SearchComicProvider>
        </ComicProvider>
      </Router>
  );
}

export default App;
