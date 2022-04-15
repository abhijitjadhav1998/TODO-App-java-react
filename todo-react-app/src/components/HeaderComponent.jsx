import { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "../resources/logo.svg";

class HeaderComponent extends Component {
  render() {
    const userStatus = AuthenticationService.isUserLoggedIn();
    let userName = AuthenticationService.getLoggedInUserName();
    console.log(userStatus);
    return (
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: "60px" }}
            />

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {userStatus && (
                <li>
                  <Link to="list_todos" className="nav-link px-2 text-white">
                    All Todos
                  </Link>
                </li>
              )}
              {userStatus && (
                <li>
                  <Link to="active_todos" className="nav-link px-2 text-white">
                    Active
                  </Link>
                </li>
              )}
              {userStatus && (
                <li>
                  <Link to="completed_todos" className="nav-link px-2 text-white">
                    Completed
                  </Link>
                </li>
              )}
            </ul>

            <div className="text-end">
              {!userStatus && (
                <Link to="/login">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </Link>
              )}
              {userStatus && (
                <Link to="/logout">
                  <button type="button" className="btn btn-outline-light me-2" onClick={AuthenticationService.logoutUser}>
                    Logout
                  </button>
                </Link>
              )}
              {!userStatus && (
                < Link to="/signup">
                  <button type="button" className="btn btn-warning">
                    Sign-up
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header >
    );
  }
}

export default HeaderComponent;
