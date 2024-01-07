class ResourceNotFoundError extends Error {
    constructor (resourceType, resourceId) {
        super (`${resourceType} with id: ${resourceId} not found!`)
        this.name = 'ResourceNotFoundError';    
    }
}

export default ResourceNotFoundError;