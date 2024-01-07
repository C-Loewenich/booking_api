import { Router } from "express";

import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js'
import auth from '../middleware/auth.js'
import checkExistanceOfRequiredInput from "../middleware/checkExistanceOfRequiredInput.js";
import checkUniqueEmail from "../middleware/checkUniqueEmail.js";

import getHosts from "../services/hosts/getHosts.js"
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const {name} = req.query
        const hosts = await getHosts(name);
        res.status(200).json(hosts);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const host = await getHostById(id);
        res.status(200).json(host);
    } catch (error) {
        next(error)
    }
}, notFoundErrorHandler);

router.post("/", auth, checkUniqueEmail, checkExistanceOfRequiredInput, async (req, res, next) => {
    try{
        const newHost = await createHost(req.body);
        res.status(201).json(newHost);    
    } catch(error) {
        next(error)
    }
});

router.put("/:id", auth, checkUniqueEmail, async (req, res, next) => {
    try{
        const {id} = req.params;
        const host = await updateHostById(id, req.body);
        res.status(200).json({
            message: `Host with id ${id} was successfully updated`,
            host
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
    try{
        
        const { id } = req.params;
        const host = await deleteHostById(id);
        res.status(200).send({
            message: `Host with id ${id} was successfully deleted`,
            host
        })
    }catch(error) {
        next(error)
    }
}, notFoundErrorHandler);


export default router;