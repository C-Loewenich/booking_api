const loginErrorHandler = (err, req, res, next) => {
    if(err.name === 'loginCridentialsNotFound') {
        console.log(err.message)
        return res.status(401).json({message: err.message})
    }
    
    next()
}

export default loginErrorHandler;