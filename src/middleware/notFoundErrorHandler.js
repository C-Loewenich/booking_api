const notFoundErrorHandler = (err, req, res, next) => {
    if(err.name === 'ResourceNotFoundError'){
        return res.status(404).json({message: err.message})
    }
    next(err)
};

export default notFoundErrorHandler;