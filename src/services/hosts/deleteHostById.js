import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const deleteHostById = async (id) => {
    const prisma = new PrismaClient()
    const deletedHost = await prisma.host.deleteMany({
        where: {
            id
        }
    });

    if(!deletedHost || deletedHost.count === 0) {
        throw new ResourceNotFoundError('Host', id)
    }

    return id;
};

export default deleteHostById;
