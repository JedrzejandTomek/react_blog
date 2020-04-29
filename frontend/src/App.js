import React from 'react';
import AppNavbar from './components/Navbar';
import PostForm from './components/CreatePost';
import PostsList from './components/PostsList';
import EditPost from './components/EditPost';
import Discussion from './components/Discussion';
import MainPage from './components/MainPage';
import About from './components/subpages/About'
import Contact from './components/subpages/Contact'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <header><AppNavbar /></header>
        <div className="app-body-container">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/about" component={About} />
            <Route path="/Contact" component={Contact} />
            <Route path="/create-article" component={PostForm} />
            <Route path="/posts-list" component={PostsList} />
            <Route path="/edit-post/:id" component={EditPost} />
            <Route path="/discussion/:id" component={Discussion} />
          </Switch>  
        </div>
      </Router>
    );
  }
}

export default App;
