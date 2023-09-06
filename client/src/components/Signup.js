import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Signup(props) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [addUser, error] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // If the input is a checkbox, update the state differently
    if (type === "checkbox") {
      setFormState({
        ...formState,
        [name]: checked,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationResponse = await addUser({
        variables: { ...formState },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.error("GraphQL Error:", e);
    }
  };

  return (
    <>
      <div className="container my-1">
        <form className="form-title" onSubmit={handleFormSubmit}>
          Signup
          <div className="flex-row space-between my-2">
            <label htmlFor="username">Username:</label>
            <input
              className="input-field"
              value={formState.username}
              placeholder="Enter Username"
              name="username"
              type="text"
              id="signupUsername"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              className="input-field"
              value={formState.email}
              placeholder="your.email@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            <label htmlFor="password">Password:</label>
            <input
              className="input-field"
              value={formState.password}
              placeholder="******"
              name="password"
              type="password"
              id="signupPwd"
              onChange={handleChange}
            />
          </div>

          {/* Checkbox input for isAdmin */}
          <div className="flex-row space-between my-2">
            <label htmlFor="isAdmin">Admin:</label>
            <input
              className="input-field"
              checked={formState.isAdmin}
              name="isAdmin"
              type="checkbox"
              id="isAdmin"
              onChange={handleChange}
            />
          </div>

          {/* Conditionally render error message */}
          {error ? (
            <div>
              {/* <p className="error-text">The provided credentials are incorrect</p> */}
            </div>
          ) : null}

          <div id="btn-container" className="flex-row flex-end">
            <button id="signup-btn" type="submit">
              Sign up!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
