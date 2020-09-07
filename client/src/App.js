import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/screens/home/Home";
import Signin from "./components/screens/login/Login";
import Profile from "./components/screens/profile/Profile";
import Signup from "./components/screens/signup/Signup";
import CreatePost from "./components/screens/createPost/createPost";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/create" component={CreatePost} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
