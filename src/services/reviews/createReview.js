import { PrismaClient } from "@prisma/client";

const createReview = async (reviewData) => {
    const prisma = new PrismaClient();

    const { userId, propertyId, rating, comment } = reviewData;

    const newReview = prisma.review.create({ 
        data: {
            rating,
            comment,
            reviewCreator: {
                connect: { id: userId }
            },
            reviewedProperty: {
                connect: { id: propertyId }
            }
        }
    })
    return newReview
};

export default createReview;
