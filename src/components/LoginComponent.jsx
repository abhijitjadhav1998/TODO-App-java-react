import { Component } from "react";
import AuthenticationService from './AuthenticationService.js';
import codewithAJ from "../resources/codewithAJ.png"

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: 'AJ',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.processLogin = this.processLogin.bind(this)

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    processLogin() {
        if (this.state.userName === 'AJ' && this.state.password === "AJ") {
            AuthenticationService.registerSuccessfulLogin(this.state.userName, this.state.password)
            this.props.navigate(`/welcome/${this.state.userName}`)
        } else {
            this.setState({ hasLoginFailed: true })
            this.setState({ showSuccessMessage: false })
        }
    }

    render() {
        return (
            <div className="LoginComponent">
                <br />
                <form>
                    {this.state.hasLoginFailed &&
                        <div className="alert alert-danger">
                            Incorrect Username or Password
                        </div>
                    }
                    <img className="mb-4" src={codewithAJ} alt="" width="auto" height="150" />
                    <div className="row g-3 align-items-center col-4 mx-auto">
                        <div className="col-auto">
                            <label htmlfor="inputPassword6" className="col-form-label">User Name</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" value={this.state.userName} name="userName" className="form-control" id="floatingInput" onChange={this.handleChange} />
                        </div>
                    </div>
                    <br />

                    <div className="row g-3 align-items-center col-4 mx-auto">
                        <div className="col-auto">
                            <label htmlfor="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" value={this.state.password} name="password" className="form-control" id="floatingPassword" onChange={this.handleChange} />
                        </div>
                    </div>
                    <br />

                    <div className="d-grid col-4 mx-auto">
                        <button className="btn btn-primary" type="button" onClick={this.processLogin} >Login</button>
                    </div>
                </form>
            </div>

        )
    }
}


export default LoginComponent