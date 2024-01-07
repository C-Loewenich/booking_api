import { PrismaClient } from "@prisma/client";

const createProperty = async (propertyData) => {

    const prisma = new PrismaClient();

    const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenities=[], bookings=[], reviews=[] } = propertyData;

    return prisma.property.create({ 
        data: {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            amenities: {
                connect: amenities.map((id) => (id))
            },
            host: {
                connect: { id: hostId }
            },
            bookings: {
                connect: bookings.map((id) => ({id}))
            },
            reviews: {
                connect: reviews.map((id) => ({id}))
            }
        }
    })
};

export default createProperty;
