// Each table has several relations which are required
// this middleware checks that the Id's required for these relations actually exist in the database.
// if this is not the case an error is returned for useability

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkRelationIdInDb (req, res, next) {
  
  const {userId, hostId, propertyId} = req.body;
  const entriesToCheck = [
    { field: 'user', id: userId },
    { field: 'host', id: hostId },
    { field: 'property', id: propertyId}
  ]
  
  try {
    for(const entry of entriesToCheck) {
      if (entry.id) {
        const entryInDb = await prisma[entry.field].findUnique({
          where: {
            id: entry.id
          }
        });
        
        if (!entryInDb) {
          return res.status(400).json({ error: `${entry.field} does not exist in the Database` })
        }
      }
    }

    next()

  } catch (error) {
    next(error)
  }

}

export default checkRelationIdInDb