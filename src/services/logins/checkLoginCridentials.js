import {PrismaClient} from "@prisma/client";
import LoginError from "../../errors/loginError.js";

const checkLoginCridentials = async (username, password) => {
    const prisma = new PrismaClient();

    const uniqueUser = await prisma.user.findUnique({
        where: {username, password}
    });
    
    if(!uniqueUser) {
        throw new LoginError()
    }
    
    return uniqueUser
};

export default checkLoginCridentials;