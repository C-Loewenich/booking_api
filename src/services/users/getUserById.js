import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const getUserById = async (id, reviews, bookings) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {id},
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phoneNumber: true,
            profilePicture: true,
            reviews: reviews === "true",
            bookings: bookings === "true",
        }
    });

    if(!user || user.count === 0) {
        throw new ResourceNotFoundError('User', id)
    }
    
    return user
};

export default getUserById;