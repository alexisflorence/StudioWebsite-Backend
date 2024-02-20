// this will handle data requests specific to classes
// Here we implement apiGetClasses, apiGetClassById, apiGetRatings
import ClassesDAO from "../dao/classesDAO.js";
export default class ClassesController {

    // for getting all the classes (broken down into 20 classes per page)
    // an object is passed through as the first argument req
    // the response object that they will help to construct is passed as the second argument 
    // third argument called next refers to a callback function that can be called when execution completes
    static async apiGetClasses(req, res, next){
        // set paging information that will be passed along with HTTP request
        const classesPerPage = req.query.classesPerPage ? parseInt(req.query.classesPerPage) : 20 // change from 20 to 2
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // set our filters on the day and title based on what are submitted to the query 
        let filters = {}
        if (req.query.day) { // change rated to day
            filters.day = req.query.day;
        } else if (req.query.title){
            filters.title = req.query.title
        }

        // make the request to ClassesDAO using the getClasses method 
        // this will return a single page's worth of movies in a list along with the total number of movies found 
        const { classesList, totalNumClasses } = await
            ClassesDAO.getClasses({ filters, page, classesPerPage});

        // take the information retrieved bythe DAO, package it up into an object (response) and puts that into the HTTP response
        // sent back to the client
        let response = {
            classes: classesList,
            page: page,
            filters: filters,
            entries_per_page: classesPerPage,
            total_results: totalNumClasses,
        };
        res.json(response);
    }

    // for getting a single class given its specifc ID value
    static async apiGetClassById(req, res, next){
        try{ 
            // request object passes in an ID value which chould match unique ID value for movie
            let id = req.params.id || {}
            //let a_class = await ClassesDAO.getClassById(id);
            let a_class = await ClassesDAO.getMovieById(id);
            if(!a_class){
                res.status(404).json({error: "not found" });
                return;
            }
            res.json(a_class);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(501).json({ error: e});
        }
    }
    
    // For getting a list of classes by day
    // query for distinct days in the database, giving a list of days to populate day filter drop down
    static async apiGetDay(req, res, next){
        try {
            let propertyTypes = await ClassesDAO.getDay();
            res.json(propertyTypes);
        } catch(e) {
            console.log(`API. ${e}`);
            res.status(500).json({ error: e });
        }
    }

}

   