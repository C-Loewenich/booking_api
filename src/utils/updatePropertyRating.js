import { PrismaClient } from "@prisma/client";

// ## Checkout ## is this still being used???

const updatePropertyRating = async (propertyId, newReviewRating) => {
    const prisma = new PrismaClient();

    const ratingData = await prisma.review.findMany({
        where: {propertyId},
        select: {
            rating: true
        }
    })

    const ratingsArray = ratingData.map(review => review.rating);
    const total = ratingsArray.reduce((acc, val) => acc + val, 0);
    const average = total / (ratingsArray.length)

    await prisma.property.update({
        where: {id: propertyId},
        data: {rating: average}
    });
}

export default updatePropertyRating;