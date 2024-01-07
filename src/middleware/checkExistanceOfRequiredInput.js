// For each model specefic values are required.
// this middleware checks if the request body contains the required input depending on origin route.
// if required in put is missing an error is returned for useability.

const checkExistanceOfRequiredInput = (req, res, next) => {

  const requiredInput = {
    "/users": ["username", "password", "name", "email", "phoneNumber"],
    "/reviews": ["userId", "propertyId", "rating"],
    "/bookings": ["userId", "propertyId", "checkinDate", "checkoutDate", "numberOfGuests", "totalPrice"],
    "/hosts": ["username", "password", "name", "email", "phoneNumber"],
    "/properties": ["hostId", "title", "description", "location", "pricePerNight", "bedroomCount", "bathRoomCount", "maxGuestCount", "rating"],
    "/amenities": ["name"],
  }
  
  const requirements = requiredInput[req.originalUrl]
  const input = Object.keys(req.body)
  
  for(const requirement of requirements) {
    if (!input.includes(requirement)) {
      return res.status(400).json({ error: `Missing in input - ${requirement} is required for ${req.originalUrl.replace("/", "")}`})
    }
  }

  next()
  
}

export default checkExistanceOfRequiredInput