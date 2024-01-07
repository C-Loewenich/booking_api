import { PrismaClient } from "@prisma/client";

const getAmenities = async (listings) => {
  const prisma = new PrismaClient();
  const amenities = await prisma.amenity.findMany({
    select: {
      id: true,
      name: true,
      listings: listings ==='true'
    }
  });

  return amenities;
};

export default getAmenities;
