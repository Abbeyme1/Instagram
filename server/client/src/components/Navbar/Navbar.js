import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import classes from "./Navbar.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import M from "materialize-css";

const Navbar = ({ user, onLogout }) => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const logout = () => {
    localStorage.clear();
    onLogout();
    M.toast({
      html: "Logged Out!",
      classes: "#c62828 red darken-1",
    });
    return history.push("/signin");
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((users) => {
        setUsersList(users.user);
      })
      .catch((err) => console.log(err));
  };
  const renderList = (user) => {
    if (user) {
      return [
        <li key="profile">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="create">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="showfollowPosts">
          <Link to="/explore">Explore</Link>
        </li>,
        <li key="logout">
          <Link to="#" onClick={logout} className={classes.logout}>
            Logout
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key="sigin">
          <Link to="/signin">
            <i className="fas fa-home" style={{ color: "black" }}></i>
          </Link>
        </li>,
        <li key="signup">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand brand-logo left">
          <span className={classes.logo}>Instagram</span>
        </Link>

        <div className={classes.search}>
          <input
            value={search}
            className={classes.searchBar}
            type="text"
            placeholder="Search"
            onChange={(e) => fetchUsers(e.target.value)}
          ></input>
          {search && usersList && (
            <ul className={classes.list}>
              {usersList.map((user) => {
                return (
                  <NavLink
                    key={user._id + (Math.random() % 10)}
                    to={"/profile/" + user._id}
                    className={classes.listNavLink}
                  >
                    <li key={user._id + (Math.random() % 10)}>
                      <span
                        className={classes.searchPic}
                        key={user._id + (Math.random() % 10)}
                      >
                        <img src={user.profilePic} />
                      </span>
                      <span className={classes.searchName}>{user.name}</span>
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          )}
        </div>

        <ul
          id="nav-mobile"
          className="right"
          style={{ backgroundColor: "white" }}
        >
          {renderList(user)}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
