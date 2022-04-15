import { Component } from "react";
import AuthenticationService from './AuthenticationService.js';

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

        AuthenticationService.executeJwtAuthenticationService(this.state.userName, this.state.password)
            .then((response) => {
                console.log(response)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.userName, response.data.token)
                this.props.navigate(`/active_todos`)
            })
            .catch(() => {
                this.setState({ hasLoginFailed: true })
                this.setState({ showSuccessMessage: false })
            })
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