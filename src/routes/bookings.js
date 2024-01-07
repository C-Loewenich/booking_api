import { Router } from "express";

import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js'
import auth from '../middleware/auth.js'
import checkBookingStatus from "../middleware/checkBookingStatus.js";
import checkRelationIdInDb from "../middleware/checkRelationIdInDb.js";
import checkExistanceOfRequiredInput from "../middleware/checkExistanceOfRequiredInput.js";

import getBookings from "../services/bookings/getBookings.js"
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const {userId, bookingStatus, bookingCreator, bookedProperty} = req.query
        const bookings = await getBookings(userId, bookingStatus, bookingCreator, bookedProperty);
        res.status(200).json(bookings);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {bookingCreator, bookedProperty} = req.query
        const booking = await getBookingById(id, bookingCreator, bookedProperty);
        res.status(200).json(booking);
    } catch (error) {
        next(error)
    }
}, notFoundErrorHandler);

router.post("/", auth, checkExistanceOfRequiredInput, checkRelationIdInDb, checkBookingStatus, async (req, res, next) => {
    try{
        const newBooking = await createBooking(req.body);
        res.status(201).json(newBooking);    
    } catch(error) {
        next(error)
    }
});

router.put("/:id", auth, checkRelationIdInDb, checkBookingStatus, async (req, res, next) => {
    try{
        const {id} = req.params;
        const booking = await updateBookingById(id, req.body);
        res.status(200).json({
            message: `Booking with id ${id} was successfully updated`,
            booking
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
    try{
        const { id } = req.params;
        const booking = await deleteBookingById(id);
        res.status(200).send({
            message: `Booking with id ${id} was successfully deleted`,
            booking
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);


export default router;