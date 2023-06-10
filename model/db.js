const env = require("dotenv")
env.config();

const mysql = require("mysql2")
/**mysql connection creation */

const createConnection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

const db_get_execute = function(query){
    return new Promise((resolve,reject) =>{
        createConnection.execute(query,function(err,result){
            // console.log(err,result,"db response")
            if(err) reject({err,result:"No Data Found"});
            else resolve({result})
        });
    });
}

const db_store_data = function(query){
    return new Promise((resolve,reject)=>{
        createConnection.execute(query,function(err,result){
            if(err) reject({err,result:"failed to insert data"})
            else resolve({result})
        })
    });
}



const getRows =  async function(limit,offset){
    const query = `SELECT * FROM information_sites limit ${limit} offset ${offset}`;
    const total_data = `SELECT count(*) as totalcount FROM information_sites `;
    const total_data_resp = await db_get_execute(total_data);
    console.log(total_data_resp["result"][0].totalcount,"total_data");
    return  { total_count  : total_data_resp["result"][0].totalcount , ...await db_get_execute(query) }
}
const getRowsByTech =  async function(limit,offset,tech){
    const query = `SELECT * FROM information_sites where concept = '${tech}' limit ${limit} offset ${offset}`;
    const total_data = `SELECT count(*) as totalcount FROM information_sites where concept = '${tech}' `;
    const total_data_resp = await db_get_execute(total_data);
    return  { total_count  : total_data_resp["result"][0].totalcount ,...await db_get_execute(query)}
}
const postData =  async function(tech,url){
    const query = `INSERT into information_sites (concept,url) values ("${tech}" ,"${url}")`;
    return await db_store_data(query)
}
const getAllContents = async function(){
    const query = "SELECT DISTINCT CONCEPT as Tech FROM information_sites";
    console.log("get all contents called...")
    return { ...await db_get_execute(query)};
}


module.exports={
    createConnection,
    getRows,
    getRowsByTech,
    postData,
    getAllContents
}