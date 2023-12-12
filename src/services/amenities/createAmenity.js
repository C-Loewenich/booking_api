import { PrismaClient } from "@prisma/client";

const createAmenity = async (name, listings=[]) => {
    const prisma = new PrismaClient();

    return prisma.amenity.create({
        data: {
            name,
            listings: {
                connect: listings.map((id) => ({id}))
            },
        }
    })
};

export default createAmenity;