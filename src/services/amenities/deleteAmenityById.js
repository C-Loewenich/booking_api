import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const deleteAmenityById = async (id) => {
    const prisma = new PrismaClient()
    const deletedAmenity = await prisma.amenity.deleteMany({
        where: {
            id
        }
    });

    if(!deletedAmenity || deletedAmenity.count === 0) {
        throw new ResourceNotFoundError('Amenity', id)
    }

    return id;
};

export default deleteAmenityById;
