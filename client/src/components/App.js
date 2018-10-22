import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import FetchUser from './FetchUser';
import Profile from './Profile';
import Matches from './Matches';
import '../index.css';
import styled from 'styled-components';

const BlackBody = styled.div`
  font-family: 'K2D', sans-serif;
  background-color: black;
  color: white;
`

class App extends Component {

  render() {
    return (
      <BlackBody>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/:username" component={Profile} />
            <Route exact path="/matches" component={Matches} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </BlackBody>
    );
  }
}

export default App;

