const {getRows,getRowsByTech,postData,getAllContents} = require("../model/db");
const {get_limit_offset} = require("../utilities/utils")

const fetchContents  = async function(req,res){
    try{
        console.log(req.query,"fetch contents")
        let {limit,offset} = await get_limit_offset(req);
        console.log(limit,offset)
        let result;

        if(!req.query.tech || req.query.tech =="all"){
            result = await getRows(limit,offset);
        }
        else{
            result = await getRowsByTech(limit,offset,req.query.tech);
        }
        console.log(result);
        res.status(200).send({
            result:result,
            message:"success"
        })
    }
    catch(e){
        console.log(e);
        res.status(404).send({
            error:e,
            message:"Error"
        })
    }
   
}
const fetchContentsByTech = async function(req,res){
    try{    
        console.log(req.body)
        let {limit,offset} = await get_limit_offset(req);
        let result = await getRowsByTech(limit,offset,req.params.tech);
        console.log(result);
        res.status(200).send({
            result:result,
            message:"success"
        })
    }
    catch(err){
        console.log(err);
        res.status(404).send({
            error:err,
            message:"Error"
        })
    }
}

const getContents = async function(req,res){
    try{
        console.log(getAllContents,"getAllContents")
        const result = await getAllContents();
        res.status(200).send({
            result:result,
            message:"success"
        })
    }
    catch(err){
        console.log(err);
        res.status(404).send({
            error:err,
            message:"Failed to fetch data"
        })
    }
}
const postContents = async function(req,res){
    try{
        const {tech,url} = req.body;
        const result = await postData(tech,url);
        console.log(result);
        res.status(200).send({
            result:result,
            message:"success"
        })
    }
    catch(err){
        console.log(err);
        res.status(404).send({
            error:err,
            message:"Failed to post data"
        })
    }
}
module.exports={fetchContents,fetchContentsByTech,postContents,getContents}