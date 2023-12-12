class ResourceNotFoundError extends Error {
    constructor (resourceType, resourceID) {
        super (`${resourceType} with id: ${resourceID} not found!`)
        this.name = 'ResourceNotFoundError';    
    }
}

export default ResourceNotFoundError;