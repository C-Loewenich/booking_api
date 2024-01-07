const notFoundErrorHandler = (err, req, res, next) => {
    if(err.name === 'ResourceNotFoundError'){
        return res.status(404).json({message: err.message})
    }
    
    next()  
};

export default notFoundErrorHandler;