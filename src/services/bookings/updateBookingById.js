import {PrismaClient} from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";



const updateBookingById = async (id, bookingData) => {
    try {
        const prisma = new PrismaClient();
    
        const {bookingCreator, bookedProperty, ...rest} = bookingData;
        const updatedBooking = await prisma.booking.update({
            where: {id},
            data: {
                ...rest,
                bookingCreator: bookingCreator ? {set: { id: userId }} : undefined,
                bookedProperty: bookedProperty ? {set: { id: propertyId}} : undefined,
            } 
        });
        
        const {password, bookingname, ...filteredBookingData} = updatedBooking
        return filteredBookingData
        
    } catch (error) {
        throw new ResourceNotFoundError('Booking', id)
    }
};

export default updateBookingById;