// this will handle data requests for reviews of classes
import ReviewsDAO from "../dao/reviewsDAO.js";
export default class ReviewsController {
    static async apiPostReview(req, res, next){
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo, 
                review,
                date
            );

            var { error } = reviewResponse;
            console.log(error);
            if (error){
                res.status(500).json({ error: "Unable to post review."});
            } else {
                res.json({status: "success"});
            }
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next){
        try { 
            const reviewId = req.body.review_id 
            const review = req.body.review 
            const date = new Date() 
            const reviewResponse = await ReviewsDAO.updateReview( 
              reviewId, 
              req.body.user_id, // we want to make sure the person who is trying to update teh review is the same one who created the review 
              review, 
              date, 
            ) 
            var { error } = reviewResponse 
            if (error) { 
              res.status(400).json({ error }) 
            } 
            if (reviewResponse.modifiedCount === 0) { // if modified count == 0 that means that the review was not updated and we can throw an error 
              throw new Error( 
                "unable to update review", 
              ) 
            } 
            res.json({ status: "success" }) 
          } catch (e) { 
            res.status(500).json({ error: e.message }) 
          }
    }

    static async apiDeleteReview(req, res, next){
        try { 
            const reviewId = req.query.id 
            const userId = req.body.user_id //just to make sure that the person deleting the review is the same one who created it  
            console.log(reviewId) 
            const reviewResponse = await ReviewsDAO.deleteReview( 
              reviewId, 
              userId, 
            ) 
            res.json({ status: reviewResponse }) 
          } catch (e) { 
            res.status(500).json({ error: e.message }) 
          } 
    }
}