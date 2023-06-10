const express = require("express")
const cors= require("cors");
const mysql = require("mysql2");
const {createConnection} = require("./model/db");
const router = require("./route/route")
const app = express();

/**
 * CORS allows AJAX requests to skip the Same-origin policy 
 * and access resources from remote hosts.
 */
app.use(cors());

/**
 * express.json() is a built in middleware function in Express 
 * It parses incoming JSON requests and puts the parsed data in req.body.
 */
app.use(express.json());


/** route from client  */

app.use("/my_personal_collection",router);

/**connect to db */

createConnection.connect(function(err){
    if(err){
        console.log(err,"db connected failed")
        process.exit(1)
    }
    app.listen("5000",()=>{
        console.log(`server running at port 3000`);
    });
})

