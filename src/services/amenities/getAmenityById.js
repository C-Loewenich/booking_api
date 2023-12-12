import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const getAmenityById = async (id) => {
    const prisma = new PrismaClient();
    const amenity = await prisma.amenity.findUnique({
        where: {id}
    });
    console.log(amenity)
    if(!amenity) {
        console.log("Ths Error is catched")
        throw new ResourceNotFoundError('Amenity', id)
    }
    return amenity
};

export default getAmenityById;