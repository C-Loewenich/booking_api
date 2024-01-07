import { Router } from "express";

import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js'
import auth from '../middleware/auth.js'
import checkExistanceOfRequiredInput from "../middleware/checkExistanceOfRequiredInput.js";
import checkUniqueEmail from "../middleware/checkUniqueEmail.js";

import getUsers from "../services/users/getUsers.js"
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const {username, email, name, reviews, bookings} = req.query
        const users = await getUsers(username, email, name, reviews, bookings);
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {reviews, bookings} = req.query
        const user = await getUserById(id, reviews, bookings);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}, notFoundErrorHandler);

router.post("/", auth, checkUniqueEmail, checkExistanceOfRequiredInput, checkExistanceOfRequiredInput, async (req, res, next) => {
    try{
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);    
    } catch(error) {
        next(error)
    }
});

router.put("/:id", auth, checkUniqueEmail, async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = await updateUserById(id, req.body);
        res.status(200).json({
            message: `User with id ${id} was successfully updated`,
            user
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
    try{
        const { id } = req.params;
        const user = await deleteUserById(id);
        res.status(200).send({
            message: `User with id ${id} was successfully deleted`,
            user
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);


export default router;