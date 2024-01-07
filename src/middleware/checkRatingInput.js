// Checks if en entered rating is between 1 to 5 (both numbers included)
// if this is not the case an error is returned for useability.

  const checkRatingInput = (req, res, next) => {

  if('rating' in req.body){
    const {rating} = req.body
    if(rating < 1 || rating > 5){
      return res.status(400).json({message: 'Invalid rating value - Please enter a rating between 1 and 5 (both values inclusive)'})
    }
  }

  next()
  
}

export default checkRatingInput