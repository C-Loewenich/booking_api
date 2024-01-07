import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const deletePropertyById = async (id) => {
    const prisma = new PrismaClient()
    const deletedProperty = await prisma.property.deleteMany({
        where: {
            id
        }
    });

    if(!deletedProperty || deletedProperty.count === 0) {
        throw new ResourceNotFoundError('Property', id)
    }

    return id;
};

export default deletePropertyById;
