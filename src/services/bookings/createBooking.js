import { PrismaClient } from "@prisma/client";

const createBooking = async (bookingData) => {
    const prisma = new PrismaClient();

    const {userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice} = bookingData;
    
    return prisma.booking.create({ 
        data: {
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingCreator: {
                connect: { id: userId }
            },
            bookedProperty: {
                connect: { id: propertyId}
            },
        }
    })
};

export default createBooking;
