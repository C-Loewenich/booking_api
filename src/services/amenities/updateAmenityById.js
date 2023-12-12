import {PrismaClient} from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const updateAmenityById = async (id, updatedAmenity) => {
    const prisma = new PrismaClient();

    console.log(id)
    const {listings, ...rest} = updatedAmenity;
    const amenity = await prisma.amenity.update({
        where: {id},
        data: {
            ...rest,
            listings: listings ? {set: listings.map((id) => ({id}))} : undefined
        } 
    });

    if(!amenity) {
        throw new ResourceNotFoundError('Amenity', id)
    }
    return amenity
};

export default updateAmenityById;