import { Component } from "react";
import { Link } from "react-router-dom";
export default class SignUpComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: 'dsadas',
            lastName: '',
            email: '',
            password: '',
        }
        this.processSignUp = this.processSignUp.bind(this)
    }
    handleChange = (event) => {
        console.log(event.target.name + " " + event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    processSignUp() {
        console.log(this.state.email, this.state.email);
    }
    render() {
        const lable_css = {
            float: "left"
        };
        const form_css = {
            display: "inline-block",
        };
        return (
            <div className="SignUpComponent">
                <form style={form_css} >
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label style={lable_css}>First name</label>
                        <input type="text" value={this.state.firstName} name="firstName" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label style={lable_css}>Last name</label>
                        <input type="text" value={this.state.lastName} name="lastName" className="form-control" placeholder="Last name" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label style={lable_css}>Email ID</label>
                        <input type="email" value={this.state.email} name="email" className="form-control" placeholder="Enter email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label style={lable_css}>Password</label>
                        <input type="password" value={this.state.password} name="password" className="form-control" placeholder="Enter password" onChange={this.handleChange} />
                    </div>
                    <br />

                    <button type="submit" onClick={this.processSignUp} className="btn btn-primary btn-block">Sign Up</button>
                    <br />

                    <p className="forgot-password text-right">
                        Already registered
                        <Link to="/login">
                            <a href="#"> Login</a>
                        </Link>
                    </p>
                </form >
            </div>

        );
    }
}