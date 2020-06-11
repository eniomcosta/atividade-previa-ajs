import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";

import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <Link to="/">List</Link>
            <Link to="/book">Insert</Link>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={BookList} />
          <Route exact path="/book" component={BookForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
