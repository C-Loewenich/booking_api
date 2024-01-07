import {PrismaClient} from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const updateHostById = async (id, hostData) => {
    try {
        const prisma = new PrismaClient();
    
        const { listings, ...rest} = hostData;
        const updatedHost = await prisma.host.update({
            where: {id},
            data: {
                ...rest,
                listings: listings? {set: property.map((id) => ({id}))} : undefined,
            } 
        });
        
        const {password, hostname, ...filteredHostData} = updatedHost
        return filteredHostData
        
    } catch (error) {
        throw new ResourceNotFoundError('Host', id)
    }
};

export default updateHostById;