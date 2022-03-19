import 'bootstrap/dist/css/bootstrap.css';
import logo from '../logo.svg';
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



export default class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);

        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="/list_todos" element={<TodosComponent />} />
                        <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}
class HeaderComponent extends Component {
    render() {
        return (
            <header class="p-3 bg-dark text-white">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <img src={logo} className="App-logo" alt="logo" style={{ height: "60px" }} />
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/welcome/AJ" className="nav-link px-2 text-secondary">Home</Link></li>
                            <li><Link to="list_todos" className="nav-link px-2 text-white">Todos List</Link></li>
                            {/* <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
                            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
                            <li><a href="#" class="nav-link px-2 text-white">About</a></li> */}
                        </ul>

                        {/* <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                        </form> */}

                        <div class="text-end">
                            <Link to="/login"><button type="button" class="btn btn-outline-light me-2">Login</button></Link>
                            <Link to="/logout"><button type="button" class="btn btn-outline-light me-2">Logout</button></Link>
                            <button type="button" class="btn btn-warning">Sign-up</button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
class LogoutComponent extends Component {
    render() {
        return (
            <div className="logout">
                <h1> You are logout Successful !!! </h1>
                <div className="container">
                    Thank You for Using Our Application.
                </div>
            </div>
        )
    }
}
class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All rights reserved © 2022 CodeWithAJ</span>
            </footer>
        )
    }
}
class TodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [
                { id: "1", description: "Learn React", done: false, targetDate: new Date() },
                { id: "2", description: "Lear Java", done: false, targetDate: new Date() },
                { id: "3", description: "Become SDE 1", done: false, targetDate: new Date() }
            ]
        }
    }
    render() {
        return (
            <div className="Todos">
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th> description</th>
                            <th> is Completed </th>
                            <th> Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

function ErrorComponent() {
    return <div> Bhai kya dhund raha he</div>
}

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class WelcomeComponent extends Component {
    render() {
        return <div>Welcome {this.props.params.name} , Lets navigate to your Todo List <Link to="/list_todos"> here </Link></div>
    }
}

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
            this.props.navigate(`/welcome/${this.state.userName}`)
        } else {
            this.setState({ hasLoginFailed: true })
            this.setState({ showSuccessMessage: false })
        }
    }

    render() {
        return (
            <div className="LoginComponent">
                {this.state.hasLoginFailed && <div> Incorrect Username or Password </div>}
                {this.state.showSuccessMessage && <div> Login Successful </div>}
                UserName: <input type="text" value={this.state.userName} name="userName" onChange={this.handleChange} />
                Password: <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                <button onClick={this.processLogin} >Login</button>
            </div>
        )
    }
}
