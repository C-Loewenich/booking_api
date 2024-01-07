import {PrismaClient} from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const updatePropertyById = async (id, propertyData) => {
    
    try {
        const prisma = new PrismaClient();
        const {hostId, amenities, host, bookings, reviews, ...rest} = propertyData;
        const updatedProperty = await prisma.property.update({
            where: {id},
            data: {
                ...rest,
                amenities: amenities ? {set: amenities.map((id) => ({id}))} : undefined,
                host: host ? {set: { id: hostId}} : undefined,
                bookings: bookings ? {set: bookings.map((id) => ({id}))} : undefined,
                reviews: reviews ? {set: reviews.map((id) => ({id}))} : undefined,
            } 
        });

        return updatedProperty

    } catch (error) {
        throw new ResourceNotFoundError('Property', id)
    }

};

export default updatePropertyById;