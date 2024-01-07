
class loginError extends Error {
    constructor () {
        super ("Login Error: Username or password incorrect!")
        this.name = 'loginCridentialsNotFound'
    }
}
export default loginError;