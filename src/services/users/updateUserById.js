import {PrismaClient} from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const updateUserById = async (id, userData) => {
    try {
        const prisma = new PrismaClient();
    
        const {reviews, bookings, ...rest} = userData;
        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                ...rest,
                reviews: reviews? {set: reviews.map((id) => ({id}))} : undefined,
                bookings: bookings ? {set: bookings.map((id) => ({id}))} : undefined
            } 
        });
        
        const {password, username, ...filteredUserData} = updatedUser
        return filteredUserData
        
    } catch (error) {
        throw new ResourceNotFoundError('User', id)
    }
};

export default updateUserById;