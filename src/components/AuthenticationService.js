class AuthenticationService {

    registerSuccessfulLogin(userName, password) {
        sessionStorage.setItem("authenticatedUser", userName)
    }

    logoutUser() {
        sessionStorage.removeItem("authenticatedUser")
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("authenticatedUser")
        if (user === null)
            return false
        else
            return true
    }
    getLoggedInUserName(){
        let user = sessionStorage.getItem("authenticatedUser")
        return user
    }
}

export default new AuthenticationService()