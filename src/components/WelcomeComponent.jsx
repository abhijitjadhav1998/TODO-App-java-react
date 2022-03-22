import { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldApi from "../api/TodoApi";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: "",
    };
  }

  render() {
    return (
      <div>
        <div className="h1">
          Welcome {this.props.params.name} , Lets navigate to your Todo List{" "}
          <Link to="/list_todos"> here </Link>
        </div>
        <div className="container">
          Click the button to get the response from the Microservice
          <button onClick={this.sendRequest} className="btn btn-success">
            Get Hello World
          </button>
          <span>{this.state.welcomeMessage}</span>
        </div>
      </div>
    );
  }

  sendRequest = () => {
    HelloWorldApi.sendGetRequest().then((response) =>
      this.processResponse(response)
    );

    console.log("Send request invoked");
  };

  processResponse(response) {
    console.log(response.data);
    this.setState({
      welcomeMessage: response.data,
    });
  }
}

export default WelcomeComponent;
