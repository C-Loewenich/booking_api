import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";
import calculateAverageRating from "../../utils/calculateAverageRating.js";

const getPropertyById = async (id) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.findUnique({
        where: {id},
        include:{
            amenities: true,
            bookings: true,
            reviews: true,
            host: { 
                select: {
                    username: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                    profilePicture: true,
                    aboutMe: true
                }
            }
        }
    });

    if(!property || property.count === 0) {
        throw new ResourceNotFoundError('Property', id)
    }
    
    const propertyWithAvgRating = calculateAverageRating(property) 

    return propertyWithAvgRating;
};

export default getPropertyById;