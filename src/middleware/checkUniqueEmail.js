import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// if there is an email in the request body it is checked if the email already exist in database table. 
// In that case an error is returned for useability

async function checkUniqueEmail (req, res, next) {
  
  const {email} = req.body;
  
  const entriesToCheck = [
    { prismaModel: 'user', route: "/users" },
    { prismaModel: 'host', route: "/hosts" },
  ]

  try {
    if (email) {
      for(const entry of entriesToCheck) {
        if(req.originalUrl === entry.route) {
          const entryInDb = await prisma[entry.prismaModel].findUnique({
            where: {
              email: email 
            }
          });
          
          if (entryInDb) {
            return res.status(400).json({ error: `A ${entry.prismaModel} already exist with this mail - Please use an unique email` })
          } 
        }
      }
    }
    
    next()

  } catch (error) {
    next(error)
  }

}

export default checkUniqueEmail