// This will query the MongoDB database directly for reviews data
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO{

    static async injectDB(conn){
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.DANCECLASSES_NS).collection('reviews');
        } catch(e){
            console.error(`Unable to establich connection handle in reviewsDA: ${e}`);
        }
    }

    static async addReview(classId, user, review, date){
        // uses data passed in as arguments to construct the doc that will be added to the database
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                class_id: ObjectId(classId)
            }
            return await reviews.insertOne(reviewDoc);
        }
        catch(e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e};
        }
    }

    static async updateReview(reviewId, userId, review, date){
        try { 
            const updateResponse = await reviews.updateOne( 
              { user_id: userId, _id: ObjectId(reviewId)}, //makes sure it had the correct review ID AND user ID 
              { $set: { review: review, date: date  } }, 
            ) 
            return updateResponse 
          } catch (e) { 
            console.error(`Unable to update review: ${e}`) 
            return { error: e } 
          }
    }

    static async deleteReview(reviewId, userId){
        try { 
            const deleteResponse = await reviews.deleteOne({ 
              _id: ObjectId(reviewId), 
              user_id: userId, 
            }) 
            return deleteResponse 
          } catch (e) { 
            console.error(`Unable to delete review: ${e}`) 
            return { error: e } 
          } 
    }
}