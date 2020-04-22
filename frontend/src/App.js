import React from 'react';
import AppNavbar from './components/Navbar';
import PostForm from './components/CreatePost';
import PostsList from './components/PostsList';
import EditPost from './components/EditPost';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header><AppNavbar /></header>
          <Switch>
            <Route path="/create-article" component={PostForm} />
            <Route exact path="/" component={PostsList} />
            <Route path="/edit-post/:id" component={EditPost} />
          </Switch>  
        </div>
      </Router>
    );
  }
}

export default App;
