import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import TodoApi from "../api/TodoApi";


class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    componentDidMount() {

        if (this.state.id === -1) {
            return
        }
        AuthenticationService.setupAxiosInterceptors()

        let username = AuthenticationService.getLoggedInUserName()

        TodoApi.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = "Enter a Description"
        } else if (values.description.length < 5) {
            errors.description = " Enter atleast 5 Chanaracters in Descriptions"
        }

        if (!moment(values.targerDate).isValid()) {
            errors.targetDate = "Enter a Valid Date"
        }
        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if (this.state.id === -1) {
            TodoApi.createTodo(username, todo)
                .then(() => this.props.navigate("/list_todos"))
        } else {
            TodoApi.updateTodo(username, this.state.id, todo)
                .then(() => this.props.navigate("/list_todos"))
        }
        console.log(values);
    }
    render() {
        let { description, targetDate } = this.state

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TodoComponent