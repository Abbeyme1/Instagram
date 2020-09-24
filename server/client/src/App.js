import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Home from "./components/screens/home/Home";
import Signin from "./components/screens/login/Login";
import Profile from "./components/screens/profile/Profile";
import Signup from "./components/screens/signup/Signup";
import CreatePost from "./components/screens/createPost/createPost";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import UserProfile from "./components/screens/userProfile/userProfile";
import AllPostsHome from "./components/screens/home/allPostsHome";
import Reset from "./components/screens/reset/reset";
import NewPassword from "./components/screens/NewPassword/NewPassword";
import Edit from "./components/screens/edit/edit";

const App = ({ getUser }) => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getUser(user);
      // history.push("/");
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/signin");
    }
  }, []);

  return (
    <Switch>
      <Route path="/profile" exact component={Profile} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/create" component={CreatePost} />
      <Route path="/profile/:userId" component={UserProfile} />
      <Route path="/explore" component={AllPostsHome} />
      <Route path="/edit" component={Edit} />
      <Route path="/reset" exact component={Reset} />
      <Route path="/reset/:token" component={NewPassword} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(actionCreators.user(user)),
  };
};

export default connect(null, mapDispatchToProps)(App);
