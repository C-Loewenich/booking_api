import { Router } from "express";

import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js'
import auth from '../middleware/auth.js'
import checkRelationIdInDb from "../middleware/checkRelationIdInDb.js";

import getProperties from "../services/properties/getProperties.js"
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import checkExistanceOfRequiredInput from "../middleware/checkExistanceOfRequiredInput.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const {location} = req.query
        const properties = await getProperties(location);
        res.status(200).json(properties);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {propertyCreator, bookedProperty} = req.query
        const property = await getPropertyById(id, propertyCreator, bookedProperty);
        res.status(200).json(property);
    } catch (error) {
        next(error)
    }
}, notFoundErrorHandler);

router.post("/", checkExistanceOfRequiredInput, checkRelationIdInDb, auth, async (req, res, next) => {
    try{
        const newProperty = await createProperty(req.body);
        res.status(201).json(newProperty);    
    } catch(error) {
        next(error)
    }
    // IDEA: What happens wehn data withou or a fake hostid or propertyid is entered. These are nesesarry information
});

router.put("/:id", checkRelationIdInDb, auth, async (req, res, next) => {
    try{
        const {id} = req.params;
        const property = await updatePropertyById(id, req.body);
        res.status(200).json({
            message: `Property with id ${id} was successfully updated`,
            property
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
    try{
        const { id } = req.params;
        const property = await deletePropertyById(id);
        res.status(200).send({
            message: `Property with id ${id} was successfully deleted`,
            property
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);


export default router;