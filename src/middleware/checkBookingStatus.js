// As an enum is used in the prisma model for the bookings status (so only specefic values can be set).
// This middleware checks if the request body contains a booking status and checks if it is one of the set values.
// if not an error is returned for useability. 

const checkBookingStatus = (req, res, next) => {

  

  if('bookingStatus' in req.body){
    const acceptedValues = ["pending", "confirmed", "canceled", "updated"];
    const {bookingStatus} = req.body
    
    if(!acceptedValues.includes(bookingStatus)){
      return res.status(400).json({message: 'Invalid bookings status - Possible inputs are (pending, confirmed, canceled)'})
    }
  }

  next()
  
}

export default checkBookingStatus