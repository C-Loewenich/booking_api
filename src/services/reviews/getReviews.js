import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany({
    include:{
      reviewCreator: true,
      reviewedProperty: true
    }
  });

  return reviews;
};

export default getReviews;
