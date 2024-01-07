import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const getReviewById = async (id) => {
    const prisma = new PrismaClient();
    const review = await prisma.review.findUnique({
        where: {id},
        include:{
            reviewCreator: true,
            reviewedProperty: true
        }
    });

    if(!review || review.count === 0) {
        throw new ResourceNotFoundError('Review', id)
    }
    
    return review
};

export default getReviewById;