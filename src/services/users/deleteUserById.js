import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const deleteUserById = async (id) => {
    const prisma = new PrismaClient()
    const deletedUser = await prisma.user.deleteMany({
        where: {
            id
        }
    });

    if(!deletedUser || deletedUser.count === 0) {
        throw new ResourceNotFoundError('User', id)
    }

    return id;
};

export default deleteUserById;
