import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";
import calculateAverageRating from "../../utils/calculateAverageRating.js";

const getBookingById = async (id, bookingCreator=true, bookedProperty=true) => {
    const prisma = new PrismaClient();
    const booking = await prisma.booking.findUnique({
        where: {id},
        include:{
            bookedProperty: bookedProperty ? {
                include:{
                    reviews: {
                        select: {
                            rating: true
                        }
                    }
                } 
            } : false,
            bookingCreator: bookingCreator ? {
                select: {
                    username: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                    profilePicture: true,
                }
            } : false  
        }
    });

    if(!booking || booking.count === 0) {
        throw new ResourceNotFoundError('Booking', id)
    }
    booking.bookedProperty = calculateAverageRating(booking.bookedProperty)
    delete booking.bookedProperty.reviews
    return booking
};

export default getBookingById;