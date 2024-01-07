
const averageRatingOfProperty = (property) => {
    const reviews = property.reviews
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0); // Calculate the total of all the reviews
    const averageRating = totalRating / reviews.length
    property.rating = isNaN(averageRating) ? null : Number(averageRating.toFixed(1));
    return property
}

const calculateAverageRating = (properties) => {

    if (Array.isArray(properties)) {
        properties.forEach(property => {
            return averageRatingOfProperty(property)
        });
    } else {
        return averageRatingOfProperty(properties) //as it is not an array only one property is in properties
    }

    return properties
}

export default calculateAverageRating;