import { PrismaClient } from "@prisma/client";
import calculateAverageRating from "../../utils/calculateAverageRating.js";

const getProperties = async (location) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where:{
      location: location
    },
    include:{
      amenities: true,
      bookings: true,
      reviews: true,
      host: { 
        select: {
          username: true,
          name: true,
          email: true,
          phoneNumber: true,
          profilePicture: true,
          aboutMe: true
        }
      }
    }
  });

  return calculateAverageRating(properties)

};

export default getProperties;
