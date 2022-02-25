import React, { useState, useEffect } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { projectFireStore } from "../../firestore/config";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Button, Header } from "semantic-ui-react";

export default function InitiateChat() {
  const [data, setData] = useState("");
  const [firstnameInput, setFirstnameInput] = useState("");
  const [lastnameInput, setLastnameInput] = useState("");
  const [userDb, setUserDb] = useState(projectFireStore.collection("Users"));
  const [targetUserPosts, setTargetUserPosts] = useState([]);
  const { currentUser, loading, error } = useSelector((state) => state.auth);
  const history = useHistory();
  const [userFound, setUserFound] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const [targetUserObj, setTargetUserObj] = useState({});

  useEffect(() => {
    console.log(currentUser.id);
  }, []);

  const searchUser = async (e) => {
    e.preventDefault();
    setBtnClicked(true);
    try {
      const snapshot = await userDb
        .where("firstname", "==", firstnameInput)
        .where("lastname", "==", lastnameInput)
        .get();

      if (snapshot.empty) {
        console.log("No results");
        setBtnClicked(false);
        alert("User not found");
      } else {
        var toUserObj;
        var toUserId;
        snapshot.forEach((element) => {
          toUserId = element.id;
          toUserObj = element.data();
        });
        console.log(toUserId);
        console.log(toUserObj);
        setTargetUserObj(toUserObj);
        setUserFound(true);
        setBtnClicked(false);
        localStorage.setItem(
          "usersinfo",
          JSON.stringify({
            sending_user: currentUser,
            receiving_user: toUserObj,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startChat = async (e) => {
    e.preventDefault();
    window.open(
      "http://localhost:3000/altochat/#/altochatapi/privatechat/" +
        currentUser.firstname +
        "/" +
        targetUserObj.firstname,
      "_self"
    );
  };
  return (
    <>
      <div>
        <Header as="h1" style={{ marginBottom: "5px" }}>
          Enter the users first and last name to chat with them
        </Header>
      </div>
      <form onSubmit={(e) => searchUser(e)}>
        <div class="ui input">
          <input
            type="text"
            placeholder="User First Name"
            onChange={(e) => setFirstnameInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="User Last Name"
            onChange={(e) => setLastnameInput(e.target.value)}
          />
          {btnClicked ? (
            <Button type="submit" secondary loading>
              Chat
            </Button>
          ) : (
            <Button type="submit" secondary>
              Search
            </Button>
          )}
        </div>
      </form>
      {userFound ? (
        <div style={{ marginTop: "10px" }}>
          <Header size="large">User found!</Header>
          <Header size="medium">Would you like to connect to chat?</Header>
          <img src={targetUserObj.profilePic} class="ui small circular image" />
          <Header size="small">
            {" "}
            {targetUserObj.firstname} {targetUserObj.lastname}
          </Header>
          <Header size="small">
            {" "}
            {targetUserObj.email}
          </Header>
          <Button
            onClick={(e) => startChat(e)}
            secondary
            style={{ marginTop: "5px" }}
          >
            Chat
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
