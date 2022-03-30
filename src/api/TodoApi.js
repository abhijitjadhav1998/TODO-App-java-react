import axios from "axios"

class HelloWorldApi {
    sendGetRequest() {
        return axios.get("http://localhost:8080/")
    }
}

class TodosApi {
    retrieveTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }
    getAlltodos(username) {
        return axios.get(`http://localhost:8080/users/${username}/todos`)
    }
    deleteTodo(id, username) {
        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`)
    }
    createTodo(username, todo) {
        return axios.post(`http://localhost:8080/users/${username}/todos`, todo)
    }
    updateTodo(username, id, todo) {
        return axios.put(`http://localhost:8080/users/${username}/todos/${id}`, todo)
    }
}

export default new TodosApi();
export { HelloWorldApi };