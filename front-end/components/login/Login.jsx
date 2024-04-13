import React, { useState } from "react";
import "./styles.css";
import { URL } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onClick = async (e) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        toast.error(
          "You need to provide username and password in order to login!"
        )
        return;
      }

      const response = await fetch(URL + '/login' , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if (!response.ok) {
        toast.error("Wrong username or password!")
      } else {
        toast.success("Logged in successfully!")
      }

    } catch(error) {
      console.error("There was an error " + error)
    }

  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="login-form-container">
        <form className="login-form">
          <p className="login-form-title">Sign in to your account</p>
          <div className="login-input-container">
            <input placeholder="Enter username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <span>
              <svg
                strokeWidth="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <div className="login-input-container">
            <input placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <span>
              <svg
                strokeWidth="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <button className="login-submit" onClick={onClick}>
            Sign in
          </button>

          <p className="login-signup-link">
            No account?
            <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
