import React from "react";
import Green_bg from "../img/Green_bg.webp";
import { COLORS_BUTTON } from "../globlaStyle/colors";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={Green_bg} alt="Green stain"></img>
      <div className="box">
        <h1>Log in</h1>
        <form action="">
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" className="form-control rounded-0"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" className="form-control rounded-0"></input>
          </div>
          <button className="btn-login w-100">Log In</button>
          <br />
          <button className="btn btn-link text-black me-0 p-0">
            Forget your password
          </button>
          <div>
            <span>Don't have an account? </span>
            <button className="btn btn-link text-black me-0 p-0">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
