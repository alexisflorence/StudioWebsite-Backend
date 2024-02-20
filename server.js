// This will be where our server code will reside. This is where the Express framework will be put to use.
import express from 'express';
import cors from 'cors';
import classes from './api/classes.route.js';

// create our express application named app
const app = express();

// use method adds various functionality (CORS)
app.use(cors());
app.use(express.json());

// sets up the base URL for our API all requests coming in on URLS will be sent to classes.route.js
app.use("/api/v1/classes", classes);
app.use('*', (req,res) => {
    res.status(404).json({error: "not found"});
})

export default app;