import { Component } from "react";
import AuthenticationService from './AuthenticationService.js';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import logo from '../resources/logo.svg';


class HeaderComponent extends Component {
    render() {
        const userStatus = AuthenticationService.isUserLoggedIn();
        console.log(userStatus)
        return (
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <img src={logo} className="App-logo" alt="logo" style={{ height: "60px" }} />
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            {userStatus && <li><Link to="/welcome/AJ" className="nav-link px-2 text-secondary">Home</Link></li>}
                            {userStatus && <li><Link to="list_todos" className="nav-link px-2 text-white">Todos List</Link></li>}
                        </ul>

                        <div className="text-end">
                            {!userStatus && <Link to="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></Link>}
                            {userStatus && <Link to="/logout"><button type="button" className="btn btn-outline-light me-2" onClick={AuthenticationService.logoutUser}>Logout</button></Link>}
                            {!userStatus && <button type="button" className="btn btn-warning">Sign-up</button>}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default HeaderComponent