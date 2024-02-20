// this will contain the top-level code for the backend. It will connect up our database and data access objects and set up exception handling. 
// import dependencies
import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import ClassesDAO from './dao/classesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import RegisteredDAO from "./dao/registeredDAO.js";

// this main function contains the top level code for our backend application
// async in order to use asynchronous await keyword in the body of the function
async function main(){
    // sets up our environment varaibles with reference to the .env file
    // they will be access with process.env followed by our environment variable name
    dotenv.config();

    // create a monogodb client object that has access to our database
    const client = new mongodb.MongoClient(
        process.env.DANCECLASSES_DB_URI
    )

    const port = process.env.PORT || 8000;

    try{
        // Connect the client to to MongoDB server database
        await client.connect();
        await ClassesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await RegisteredDAO.injectDB(client);

        // set the server (imported as app) to listen to our port
        app.listen(port, () => {
            console.log('Server is running on port: '+ port)
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
main().catch(console.error);