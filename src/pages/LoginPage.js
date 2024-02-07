import { useState } from "react";
import { connect } from "react-redux";
import { handleAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../src/assets/loginPage-logo.png";
import TextInput from "../components/TextInput";
import React from "react";
import { handleSetReturnUrl } from "../actions/returnUrl";

const LoginPage = ({ users, dispatch, returnUrl }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const handleUserName = (e) => {
    const userName = e.target.value;
    setInvalidLogin(false);
    setUserName(userName);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setInvalidLogin(false);

    setPassword(password);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find((user) => user.id === userName);
    if (!foundUser || foundUser.password !== password) {
      setInvalidLogin(true);
    } else {
      setInvalidLogin(false);
      dispatch(handleAuthedUser(foundUser));
      dispatch(handleSetReturnUrl(""));
      navigate(returnUrl ? returnUrl : "/");
    }
  };

  return (
    <div className="login-page">
      <h1>Employee Polls</h1>
      <img className="login-img" src={logo} alt="app-logo" />
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <TextInput
          id="userId"
          placeholder="User"
          type="text"
          label="User"
          value={userName}
          onChange={handleUserName}
          testid="username-input"
        />
        <TextInput
          id="userPassword"
          placeholder="Password"
          type="password"
          label="Password"
          value={password}
          onChange={handlePassword}
          testid="password-input"
        />
        {invalidLogin && (
          <div className="login-invalid" data-testid="invalid-message">
            Invalid login
          </div>
        )}
        <button
          className="button"
          type="submit"
          disabled={userName === "" || password === ""}
          data-testid="login-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users, returnUrl }) => {
  return {
    users: Object.values(users),
    returnUrl,
  };
};

export default connect(mapStateToProps)(LoginPage);
