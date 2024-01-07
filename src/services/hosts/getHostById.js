import { PrismaClient } from "@prisma/client";
import calculateAverageRating from "../../utils/calculateAverageRating.js";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const getHostById = async (id) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.findUnique({
        where: {id},
        include: {
            listings: {
                include: {
                    reviews: {
                        select: {
                            rating: true
                        }
                    }
                }
            }
        }
    }); 
    if(!host || host.count === 0) {
        throw new ResourceNotFoundError('Host', id)
    }
    host.listings = calculateAverageRating(host.listings)
    host.listings.forEach(listing => delete listing.reviews)
    return host
};

export default getHostById;