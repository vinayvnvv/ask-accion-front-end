import * as React from 'react';
import './App.css';
import { ChatApp } from './components';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Templates } from './templates';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={ChatApp} />
          <Route exact path="/templates" component={Templates} />
        </div>
      </Router>
    );
  }
}

export default App;
