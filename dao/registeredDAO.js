let registeredCollection;


export default class RegisteredDAO {
    static async injectDB(conn){
        if (registeredCollection){
            return; 
        }

        try {
            registeredCollection = await conn.db(process.env.DANCECLASSES_NS)
                        .collection('registered');
        }
        catch(e){
            console.error(`Unable to connect to RegisteredDAO: ${e}`);
        }
    }

    static async updateRegistered(userId, registered){
        try{
            const updateResponse = await registeredCollection.updateOne(
                {_id: userId}, 
                { $set: { registered: registered }},
                { upsert: true}
            )
            return updateResponse
        }
        catch(e) {
            console.error(`Unable to update registered: ${e}`);
            return { error : e};
        }
    }

    // static async getRegisteredById(id){
    //     try {
    //         return await registeredCollection.aggregate([
    //             {
    //                 $match: {
    //                     _id: new ObjectId(id),
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: 'registered',
    //                     localField: '_id',
    //                     foreignField: 'registered_id',
    //                     as: 'registered',
    //                 }
    //             }
    //         ]).next();
    //     } catch(e){
    //         console.error(`Something went wrong in getRegisteredById: ${e}`);
    //         throw e;
    //     }
    // }

    static async getRegistered(id){
        let cursor; 
        try {
            cursor = await registeredCollection.find({
                _id: id
            });
            const registered = await cursor.toArray();
            return registered[0];
        } catch(e) {
            console.error(`Something went wrong in getRegistered: ${e}`);
            throw e;
        }
    }

    // static async deleteRegistered(registeredId, userId){
    //     try { 
    //         const deleteResponse = await registeredCollection.deleteOne({ 
    //           _id: ObjectId(registeredId), 
    //           user_id: userId, 
    //         }) 
    //         return deleteResponse 
    //       } catch (e) { 
    //         console.error(`Unable to delete registered: ${e}`) 
    //         return { error: e } 
    //       } 
    // }


}