import axios from "axios"

class HelloWorldApi{
    sendGetRequest(){
        return axios.get("http://localhost:8080/")
    }
}

export default new HelloWorldApi()