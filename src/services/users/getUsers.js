import { PrismaClient } from "@prisma/client";
import StringToBoolean from "../../utils/stringToBoolean.js";

const getUsers = async (username, email, name, reviews, bookings) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    where:{
      username: username ? username : undefined,
      email: email ? email : undefined,
      name: name ? name : undefined,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      reviews: StringToBoolean(reviews),
      bookings: StringToBoolean(bookings),
    }
  });

  return users;
};

export default getUsers;
