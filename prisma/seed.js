import { PrismaClient } from '@prisma/client'
import amenityData from '../src/data/amenities.json' assert {type : 'json'}
import bookingData from '../src/data/bookings.json' assert {type : 'json'}
import hostData from '../src/data/hosts.json' assert {type : 'json'}
import propertyData from '../src/data/properties.json' assert {type : 'json'}
import reviewData from '../src/data/reviews.json' assert {type : 'json'}
import userData from '../src/data/users.json' assert {type : 'json'}

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'] })

async function main () {
    const { amenities } = amenityData
    const { bookings } = bookingData
    const { hosts } = hostData
    const { properties } = propertyData
    const { reviews } = reviewData
    const { users } = userData

    console.log("seeding amenities")
    for (const amenity of amenities) {
        await prisma.amenity.upsert({
            where: {id: amenity.id},
            update: {},
            create: amenity
        })
    }

    console.log("seeding users")
    for (const user of users) {
        await prisma.user.upsert({
            where: {id: user.id},
            update: {},
            create: {
                id: user.id,
                username: user.username,
                password: user.password,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePicture: user.profilePicture,
                reviews: {
                    connect: user.reviews && Array.isArray(user.reviews) ? user.reviews.map((id) => ({id})) : []
                },
                bookings: {
                    connect: user.bookikngs && Array.isArray(user.bookings) ? user.bookings.map((id) => ({id})) : []
                }
            }
        })
    }

    console.log("seeding host")
    for (const host of hosts) {
        await prisma.host.upsert({
            where: {id: host.id},
            update: {},
            create: {
                id: host.id,
                username: host.username,
                password: host.password,
                name: host.name,
                email: host.email,
                phoneNumber: host.phoneNumber,
                profilePicture: host.profilePicture,
                aboutMe: host.aboutMe,
                listings: {
                    connect: host.listings && Array.isArray(host.listings) ? host.listings.map((id) => ({id})) : []
                }
            }
        })
    }
    
    console.log("seeding property")
    for (const property of properties) {
        await prisma.property.upsert({
            where: {id: property.id},
            update: {},
            create: {
                id: property.id,
                title: property.title,
                description: property.description,
                location: property.location,
                pricePerNight: property.pricePerNight,
                bedroomCount: property.bedroomCount,
                bathRoomCount: property.bathRoomCount,
                maxGuestCount: property.maxGuestCount,
                rating: property.rating,
                amenities: {
                    connect: property.amenities && Array.isArray(property.amenities) ? property.amenities.map((id) => ({id})) : []
                },
                host: {
                    connect: {id: property.hostId}
                },
                bookings: {
                    connect: property.bookings && Array.isArray(property.bookings) ? property.bookings.map((id) => ({id})) : []
                },
                reviews: {
                    connect: property.reviews && Array-isArray(property.reviews) ? property.reviews.map((id) => ({id})) : []
                },
            }
        })
    }
    
    console.log("seeing Reviews")
    for (const review of reviews) {
        await prisma.review.upsert({
            where: {id: review.id},
            update: {},
            create: {
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                reviewCreator: {
                    connect: {id: review.userId}
                },
                reviewedProperty: {
                    connect: {id: review.propertyId}
                }
            }
        })
    }

    console.log("seeding booking")
    for (const booking of bookings) {
        await prisma.booking.upsert({
            where: {id: booking.id},
            update: {},
            create: {
                id: booking.id,
                checkinDate: booking.checkinDate,
                checkoutDate: booking.checkoutDate,
                numberOfGuests: booking.numberOfGuests,
                totalPrice: booking.totalPrice,
                bookingStatus: booking.bookingStatus,
                bookingCreator: {
                    connect: {id: booking.userId}
                },
                bookedProperty: {
                    connect: {id: booking.propertyId}
                }
            }
        })
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })