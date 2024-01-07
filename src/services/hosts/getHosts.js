import { PrismaClient } from "@prisma/client";
import calculateAverageRating from "../../utils/calculateAverageRating.js";

const getHosts = async (name) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    where:{
      name: name ? name : undefined
    },
    include: {
      listings: {
        include: {
          reviews: {
            select: {
              rating: true
            }
          }
        }
      }
    }
  });

  hosts.map(host => {
    host.listings = calculateAverageRating(host.listings)
    host.listings.forEach(listing => delete listing.reviews)
    return host
  })

  return hosts;
};

export default getHosts;
