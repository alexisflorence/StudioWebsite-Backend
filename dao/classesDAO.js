// This will query the MongoDB database directly for classes data
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let classes; 

export default class ClassesDAO{
    // conn object is the database connection
    static async injectDB(conn){
        if (classes) {
            return;
        }
        try {
            classes = await conn.db(process.env.DANCECLASSES_NS).collection('classes')
        }
        catch(e) {
            console.error(`Unable to connect in ClassesDAO: ${e}`);
        }
    }

    static async getClasses({
        // pass in default parameters in case an under specified argument passed 
            filters = null,
            page = 0,
            classesPerPage = 20,
        } = {}) { // empty object is default parameter in case arg is undefined
        let query; 
        if (filters) {
            if ("title" in filters){
                query = { $text: { $search: filters['title']}};
            } else if ("day" in filters) {
                query = {"day": { $eq: filters['day']}}
            }
        }

        let cursor;
        try {
            cursor = await classes.find(query).limit(classesPerPage).skip(classesPerPage * page);
            const classesList = await cursor.toArray();
            const totalNumClasses = await classes.countDocuments(query);
            return {classesList, totalNumClasses};
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return { classesList: [], totalNumClasses: 0 };
        }
    }


    static async getDay() {
        let day = [];
        try {
            day = await classes.distinct("day");
            return day;
        } catch(e) {
            console.error(`Unable to get day, ${e}`);
            return day;
        }
    }

    static async getClassById(id){
        try {
            return await classes.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'class_id',
                        as: 'reviews',
                    }
                }
            ]).next();
        } catch(e){
            console.error(`Something went wrong in getClassById: ${e}`);
            throw e;
        }
    }
}