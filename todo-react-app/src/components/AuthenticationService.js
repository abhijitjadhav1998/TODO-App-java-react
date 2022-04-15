import { API_URL } from "../Config"
import axios from "axios"
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_TOKEN = 'token'

class AuthenticationService {

    // registerSuccessfulLogin(userName, password) {
    //     sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, userName)
    // }

    logoutUser() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null)
            return false
        else
            return true
    }
    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return user
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }
    createJWTToken(token) {
        return 'Bearer ' + token
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_TOKEN, this.createJWTToken(token))
        this.setupAxiosInterceptors()
    }
    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = sessionStorage.getItem(USER_TOKEN)
                }
                return config
            }
        )
    }

    // setupAxiosInterceptors(token) {
    //     axios.interceptors.request.use(
    //         (config) => {
    //             if (this.isUserLoggedIn()) {
    //                 config.headers.authorization = token
    //             }
    //             return config
    //         }
    //     )
    // }
}

export default new AuthenticationService()