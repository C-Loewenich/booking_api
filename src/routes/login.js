import { Router } from "express";
import getLoggedInUser from "../services/logins/checkLoginCridentials.js"
import jwt from "jsonwebtoken";
import loginErrorHandler from "../middleware/loginErrorHandler.js";

const router = Router();

router.post("/", async (req, res, next) => {
try {
    const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
    const { username, password } = req.body;
    const user = await getLoggedInUser(username, password);

    const { id, name, profilePicture } = user;
    const token = jwt.sign({ userId: user.id }, secretKey);
  
    res.status(200).json({ message: "Successfully logged in!", token, user: {id, name, profilePicture} });
} catch (error) {
  next(error)
}
}, loginErrorHandler);

export default router;