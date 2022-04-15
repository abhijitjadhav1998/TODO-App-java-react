import "bootstrap/dist/css/bootstrap.css";
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute.js";
import HeaderComponent from "./HeaderComponent";
import LoginComponent from "./LoginComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import TodosComponent from "./TodosComponent.jsx";
import TodoComponent from "./TodoComponent.jsx";
import CompletedTodosComponent from "./CompletedTodosComponent.jsx"
import ActiveTodosComponent from "./ActiveTodosComponent.jsx"
import SignUpComponent from "./SignUpComponent.jsx"

export default class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParams = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    const TodosComponentWithNavigation = withNavigation(TodosComponent)
    const CompletedTodosComponentWithNavigation = withNavigation(CompletedTodosComponent);
    const ActiveTodosComponentWithNavigation = withNavigation(ActiveTodosComponent);
    const SignUpComponentWithNavigation = withNavigation(SignUpComponent);
    const TodoComponentWithParamsAndNavigation = withParams(
      withNavigation(TodoComponent)
    );

    return (
      <div className="TodoApp">
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route path="/signup" element={<SignUpComponentWithNavigation />} />


            <Route path="/logout" element={
              <AuthenticatedRoute>
                <LogoutComponent />
              </AuthenticatedRoute>
            }
            />
            <Route path="/todos/:id" element={
              <AuthenticatedRoute>
                <TodoComponentWithParamsAndNavigation />
              </AuthenticatedRoute>
            }
            />
            <Route path="/list_todos" element={
              <AuthenticatedRoute>
                <TodosComponentWithNavigation />
              </AuthenticatedRoute>
            }
            />
            <Route path="/completed_todos" element={
              <AuthenticatedRoute>
                <CompletedTodosComponentWithNavigation />
              </AuthenticatedRoute>
            }
            />
            <Route path="/active_todos" element={
              <AuthenticatedRoute>
                <ActiveTodosComponentWithNavigation />
              </AuthenticatedRoute>
            }
            />
            <Route path="/welcome/:name" element={
              <AuthenticatedRoute>
                <WelcomeComponentWithParams />
              </AuthenticatedRoute>
            }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

function ErrorComponent() {
  return <div> Bhai kya dhund raha he</div>;
}

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}
