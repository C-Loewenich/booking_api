import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const deleteReviewById = async (id) => {
    const prisma = new PrismaClient()
    const deletedReview = await prisma.review.deleteMany({
        where: {
            id
        }
    });

    if(!deletedReview || deletedReview.count === 0) {
        throw new ResourceNotFoundError('Review', id)
    }

    return id;
};

export default deleteReviewById;
