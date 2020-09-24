import React, { useState, useEffect } from "react";
import classes from "./edit.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import { useHistory } from "react-router-dom";

const Edit = ({ user, onUploadPic, onUpdateInfo }) => {
  // console.log(user);
  const history = useHistory();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
    }
  }, [user]);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instagram");
      data.append("cloud_name", "abbeyme");
      fetch("https://api.cloudinary.com/v1_1/abbeyme/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              profilePic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              // console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...user, profilePic: result.profilePic })
              );
              onUploadPic(result.profilePic);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  const uploadProfilePic = (image) => {
    setImage(image);
  };

  const chooseImage = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      var file = e.target.files[0];
      uploadProfilePic(file);
    };

    input.click();
  };

  const updateInfo = () => {
    fetch("/editDetails", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: name,
        bio: bio,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            name: result.user.name,
            bio: result.user.bio,
          })
        );
        onUpdateInfo(result.user.name, result.user.bio);
        history.push("/profile");
      });
  };

  return (
    <div>
      <div className={classes.edit}>
        <div className={classes.editOptions}></div>
        <div className={classes.editVals}>
          <div className={classes.info}>
            <table>
              <tr className={classes.user}>
                <td>
                  <img
                    src={user ? user.profilePic : "loading"}
                    alt="profilePic"
                  />
                </td>
                <td>
                  <h4>{user ? user.email : "loading.."}</h4>
                  <h6 className={classes.change} onClick={chooseImage}>
                    Change Profile Photo
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Name</h5>
                </td>
                <td>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <h5>Bio</h5>
                </td>
                <td>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </td>
              </tr>
            </table>
            <button className={classes.btn} onClick={() => updateInfo()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadPic: (profilePic) =>
      dispatch(actionCreators.uploadPic({ profilePic: profilePic })),
    onUpdateInfo: (name, bio) =>
      dispatch(actionCreators.updateDetails({ name: name, bio: bio })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
