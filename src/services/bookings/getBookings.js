import { PrismaClient } from "@prisma/client";
import calculateAverageRating from "../../utils/calculateAverageRating.js";

const getBookings = async (userId, bookingStatus, bookingCreator=true, bookedProperty=true) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where:{
      userId: userId,
      bookingStatus: bookingStatus ? bookingStatus : undefined,
    },
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
      } : false,
    }
  });

  bookings.map(booking => {
    booking.bookedProperty = calculateAverageRating(booking.bookedProperty)
    delete booking.bookedProperty.reviews
    return booking
  })

  return bookings;
};

export default getBookings;
