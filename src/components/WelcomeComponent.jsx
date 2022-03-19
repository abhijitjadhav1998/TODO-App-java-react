import { Component } from "react";
import { Link } from "react-router-dom"



class WelcomeComponent extends Component {
    render() {
        return <div className="h1">Welcome {this.props.params.name} , Lets navigate to your Todo List <Link to="/list_todos"> here </Link></div>
    }
}

export default WelcomeComponent