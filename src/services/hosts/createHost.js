import { PrismaClient } from "@prisma/client";

const createHost = async (hostData) => {
    const prisma = new PrismaClient();

    const {profilePicture=null, listings=[], ...rest} = hostData;
    return prisma.host.create({
        data: {
            ...rest,
            profilePicture,
            listings: {
                connect: listings.map((id) => ({id}))
            }
        }
    }) 
};
    
export default createHost;