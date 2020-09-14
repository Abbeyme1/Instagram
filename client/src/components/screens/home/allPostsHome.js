import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import Navbar from "../../Navbar/Navbar";
import { connect } from "react-redux";

const AllPostsHome = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("[home]");
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
          if (item._id === result._id) {
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
          if (item._id === result._id) {
            return result;
          } else return item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const comment = (text, postId) => {
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
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else return item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (postId, commentId) => {
    // console.log(postId, commentId);
    fetch(`/deletecomment/${postId}/${commentId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("Data ", data);
        // console.log("res ", result);
        const newData = data.map((item) => {
          // console.log("item comments ", item.comments);
          if (item._id === postId) {
            var commentss = item.comments.filter((comment) => {
              return comment._id !== commentId;
            });

            item.comments = commentss;
          }

          return item;
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
            deletePost={(id) => {
              deletePost(id);
            }}
            deleteComment={(postId, commentId) =>
              deleteComment(postId, commentId)
            }
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

export default connect(mapStateToProps)(AllPostsHome);
