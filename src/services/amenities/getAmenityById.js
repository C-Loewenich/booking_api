import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const getAmenityById = async (id, listings) => {
    const prisma = new PrismaClient();
    const amenity = await prisma.amenity.findUnique({
        where: {id},
        select: {
            id: true,
            name: true,
            listings: listings === 'true'
        }

    });
    
    if(!amenity) {
        throw new ResourceNotFoundError('Amenity', id)
    }
    
    return amenity
};

export default getAmenityById;