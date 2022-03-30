import React, { Component } from 'react'
import TodoApi from "../api/TodoApi";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";


class TodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null,
    };
    this.refreshTodoPage = this.refreshTodoPage.bind(this);
    this.processDeleteClick = this.processDeleteClick.bind(this);
    this.processUpdateClick = this.processUpdateClick.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this)
  }
  componentDidMount() {
    let userName = AuthenticationService.getLoggedInUserName();
    this.refreshTodoPage(userName);
  }
  refreshTodoPage(userName) {
    TodoApi.getAlltodos(userName).then((response) => {
      this.setState({
        todos: response.data,
      });
    });
  }

  render() {
    return (
      <div className="Todos">
        <h1>List Todos</h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <table className="table table-striped table-fixed">
          <thead>
            <tr>
              <th> description</th>
              <th> is Completed </th>
              <th> Target Date</th>
              <th> Update </th>
              <th> Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.status.toString()}</td>
                <td>{moment(todo.targetDate).format("DD-MM-YYYY")}</td>
                <td>
                  <button className="btn btn-success" onClick={() => this.processUpdateClick(todo.id)}>Update </button>
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => this.processDeleteClick(todo.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <button type="button" className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
        </div>
      </div>
    );
  }
  addTodoClicked() {
    this.props.navigate("/todos/-1")
  }
  processDeleteClick(id) {
    let userName = AuthenticationService.getLoggedInUserName();
    TodoApi.deleteTodo(id, userName).then((response) => {
      this.setState({
        message: `Successfully deleted the ${id} todo`,
      });
      this.refreshTodoPage(userName);
    });
  }
  processUpdateClick(id) {
    this.props.navigate(`/todos/${id}`)//REACT-6
  }
}
export default TodosComponent;
