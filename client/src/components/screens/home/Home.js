import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import Navbar from "../../Navbar/Navbar";
import { connect } from "react-redux";

const Home = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else return item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //! DIDNT GOT THIS LOGIC COMPLETELY INTO HEAD
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else return item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (id) => {
    fetch(`/deletepost/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const comment = (text, postId) => {
    console.log(text, postId);
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else return item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <Navbar />
      {Object.keys(data).map((item) => {
        return (
          <Card
            user={user._id}
            data={data[item]}
            key={data[item]._id}
            like={(id) => likePost(id)}
            unlike={(id) => unlikePost(id)}
            comment={(text, postId) => comment(text, postId)}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(Home);
