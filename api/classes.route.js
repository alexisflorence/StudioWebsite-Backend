// This will handle routing of incoming http requests, based on their URLs.
// routing means handling requests based on their different URLs and HTTP request methods (GET, POST, PUT, DELETE)
import express from 'express';
import ClassesController from './classes.controller.js';
import ReviewsController from './reviews.controller.js';
import RegisteredController from './registered.controller.js';

const router = express.Router(); // get access to express router

// GET request to the / URL will call apiGetClasses on the classes controller
router.route("/").get(ClassesController.apiGetClasses);
// the GET request to the URL /id followed by actual ID value for the class
router.route("/id/:id").get(ClassesController.apiGetClassById);
// the GET request to the /day URL
router.route("/day").get(ClassesController.apiGetDay);

// handles a POST request for reviews, 
// router.route("/review").post(ReviewsController.apiPostReview);
// router.route("/review").put(ReviewsController.apiUpdateReview);
// router.route("/review").delete(ReviewsController.apiDeleteReview);

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview);

router
    .route("/registered")
    .put(RegisteredController.apiUpdateRegistered)

    // .delete(RegisteredController.apiDeleteRegistered)

// router
//     .route("classes/idList/:id")
//     .get(RegisteredController.apiGetRegisteredById);


router
    .route("/registered/:userId")
    .get(RegisteredController.apiGetRegistered)



// we won't be creating, editing, or deleting classes, so we don't need POST, PUT, or DELETE
// The reviews of the classes will be created, edited, and deleted by logged in users, 

// exports router as a module so that it can be importes by server.js
export default router;