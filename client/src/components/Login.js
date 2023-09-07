import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import './Login.css';
import Signup from "./Signup.js";


export default function Login(props) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, error] = useMutation(LOGIN);
  const [hideState, setHideState] = useState({
    signin: {},
    create: {
      display: "none",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
 
  const hider = async () => {
    setHideState({
      signin: {
        display: "none",
      },
      create: {
        display: "block",
      },
    });
  };

  const shower = async () => {
    setHideState({
      signin: {
        display: "block",
      },
      create: {
        display: "none",
      },
    });
  };

 return (
    <div>
      <div style={hideState.signin} className="container one">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              
              <div className="card-body">
                <form autoComplete="off" className="form-title" onSubmit={handleFormSubmit}>
                  <div className="form-label">
                    <label htmlFor="username">Username</label>
                    <input
                      className="form-control"
                      placeholder="Your Username"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-label">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      placeholder="********"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group form-text">
                    <button id="login-btn" className="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                </form>

                <div className="form-group form-text">
                  <hr/>
                  <button
                    className="btn btn-primary"
                    onClick={hider}
                  >
                    Create Account
                  </button>
                </div>

                {error && <div className="text-danger">{error.message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={hideState.create}>
        <div className="container">
        
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                
                  <div className="form-group form-text">
                  <Signup />
                    <hr />
                    <button
                      className="btn btn-primary"
                      onClick={shower}
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}