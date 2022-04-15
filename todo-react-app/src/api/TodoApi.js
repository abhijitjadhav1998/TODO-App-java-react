import axios from "axios"
import { API_URL, JPA_API_URL } from "../Config";

class TodosApi {
    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }
    getAlltodos(username) {
        return axios.get(`${JPA_API_URL}/users/${username}/todos`)
    }
    getActivetodos(username) {
        return axios.get(`${JPA_API_URL}/users/${username}/activetodos`)
    }
    getCompletedtodos(username) {
        return axios.get(`${JPA_API_URL}/users/${username}/completedtodos`)
    }
    deleteTodo(id, username) {
        return axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }
    createTodo(username, todo) {
        return axios.post(`${JPA_API_URL}/users/${username}/todos`, todo)
    }
    updateTodo(username, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`, todo)
    }
    markTodoIncomplete(id, username) {
        return axios.put(`${JPA_API_URL}/users/${username}/todos/${id}/incomplete`)
    }
    markTodoComplete(id, username) {
        return axios.put(`${JPA_API_URL}/users/${username}/todos/${id}/complete`)
    }
}

export default new TodosApi();
