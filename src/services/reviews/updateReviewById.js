import {PrismaClient} from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";


const updateReviewById = async (id, reviewData) => {
    
    try {
        const prisma = new PrismaClient();
        const {userId, propertyId, rating, reviewCreator, reviewedProperty, ...rest} = reviewData;

        const updatedReview = await prisma.review.update({
            where: {id},
            data: {
                ...rest,
                rating: rating,
                reviewCreator: reviewCreator ? {set: {id: userId}} : undefined,
                reviewedProperty: reviewedProperty ? {set: { id: propertyId}} : undefined,
            } 
        });

        return updatedReview

    } catch (error) {
        throw new ResourceNotFoundError('Review', id)
    }
};

export default updateReviewById;