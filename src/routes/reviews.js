import { Router } from "express";

import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js'
import auth from '../middleware/auth.js'
import checkRatingInput from "../middleware/checkRatingInput.js";
import checkRelationIdInDb from "../middleware/checkRelationIdInDb.js";

import getReviews from "../services/reviews/getReviews.js"
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import checkExistanceOfRequiredInput from "../middleware/checkExistanceOfRequiredInput.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {propertyCreator, bookedReview} = req.query
        const property = await getReviewById(id, propertyCreator, bookedReview);
        res.status(200).json(property);
    } catch (error) {
        next(error)
    }
}, notFoundErrorHandler);

router.post("/", checkExistanceOfRequiredInput, checkRelationIdInDb, checkRatingInput, auth, async (req, res, next) => {
    try{
        const newReview = await createReview(req.body);
        res.status(201).json(newReview);    
    } catch(error) {
        next(error)
    }
    // IDEA: What happens wehn data withou or a fake hostid or propertyid is entered. These are nesesarry information
});

router.put("/:id", checkRelationIdInDb, checkRatingInput, auth, async (req, res, next) => {
    try{
        const {id} = req.params;
        const property = await updateReviewById(id, req.body);
        res.status(200).json({
            message: `Review with id ${id} was successfully updated`,
            property
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
    try{
        const { id } = req.params;
        const property = await deleteReviewById(id);
        res.status(200).send({
            message: `Review with id ${id} was successfully deleted`,
            property
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);


export default router;