import { PrismaClient } from "@prisma/client";
import ResourceNotFoundError from "../../errors/notFoundError.js";

const deleteBookingById = async (id) => {
    const prisma = new PrismaClient()
    const deletedBooking = await prisma.booking.deleteMany({
        where: {
            id
        }
    });

    if(!deletedBooking || deletedBooking.count === 0) {
        throw new ResourceNotFoundError('Booking', id)
    }

    return id;
};

export default deleteBookingById;
