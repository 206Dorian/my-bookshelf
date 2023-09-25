import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import './Login.css';

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
      const username = mutationResponse.data.login.user.username;
      Auth.login(token, username);
    } catch (e) {
      console.error("GraphQL Error:", e);
    }
  };


  return (
    <div>

      <div className="row justify-content-center">


              <div className="card-body">
        <form autoComplete="off" className="form-title" onSubmit={handleFormSubmit}>
          <div className="form-label">
            <label htmlFor="username">Username</label>
            <input
              className="form-control w-100"
              value={formState.username}
              placeholder="Enter Username"
              name="username"
              type="text"
              id="signupUsername"
              onChange={handleChange}
            />
          </div>

          <div className="form-label">
            <label htmlFor="email">Email</label>
            <input
              className="form-control w-100"
              value={formState.email}
              placeholder="your.email@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-label">
            <label htmlFor="password">Password</label>
            <input
              className="form-control w-100"
              value={formState.password}
              placeholder="********"
              name="password"
              type="password"
              id="signupPwd"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control form-check">
            <input
              className="form-check-input"
              checked={formState.isAdmin}
              name="isAdmin"
              type="checkbox"
              id="isAdmin"
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="isAdmin">
              Admin
            </label>
          </div>
  {/* Conditionally render error message */}
  {error ? (
            <div>
              {/* { <p className="error-text">The provided credentials are incorrect</p> } */}
            </div>
          ) : null}
          <div className="d-flex form-group form-text justify-content-center">
            <button type="submit" className="btn btn-primary" id="signup-btn">
              Sign up!
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>

  );
};


