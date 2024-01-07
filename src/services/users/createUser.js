import { PrismaClient } from "@prisma/client";

const createUser = async (userData) => {
    const prisma = new PrismaClient();

    const {profilePicture=null, reviews=[], bookings=[], ...rest} = userData;
    return prisma.user.create({
        data: {
            ...rest,
            profilePicture,
            reviews: {
                connect: reviews.map((id) => ({id}))
            },
            bookings: {
                connect: bookings.map((id) => ({id}))
            },
        }
    })
};

export default createUser;