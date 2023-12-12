import { Router } from "express";

import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js'
import getAmenities from "../services/amenities/getAmenities.js"
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const amenities = await getAmenities();
        res.json(amenities);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    //try {
        const {id} = req.params;
        const amenity = await getAmenityById(id);
        res.status(200).json(amenity);
        console.log("response received by router ", amenity)
    //} catch (error) {
    //    next(error)
    //}
}, notFoundErrorHandler);

router.post("/", async (req, res, next) => {
    try{
        const { name, listings } = req.body;
        const newAmenity = await createAmenity(name, listings);
        res.status(201).json(newAmenity);    
    } catch(error) {
        next(error)
    }
});

router.put("/:id", async (req, res, next) => {
    try{
        const {id} = req.params;
        const { name, listings } = req.body;
        const amenity = await updateAmenityById(id, {name, listings});
        res.status(200).json({
            message: `Amenity with id ${id} was successfully updated`,
            amenity
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);

router.delete("/:id", async (req, res, next) => {
    try{
        const { id } = req.params;
        const amenity = await deleteAmenityById(id);
        res.status(200).send({
            message: `Amenity with id ${id} was successfully deleted`,
            amenity
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);


export default router;