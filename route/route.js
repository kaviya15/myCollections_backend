const router = require("express").Router();
const {fetchContents,fetchContentsByTech,postContents, getContents} = require("../controller/collections_controller")


router.get("/search",fetchContents);
router.get("/fetchtech",getContents);
router.post("/post_content",(req,res,next)=>{
    if(!req.body.tech || !req.body.url) 
    return res.status(400).send(
        {error:"Bad Request",
        message:"please send all the values"
    });
    else next();
},postContents);



router.get("/*",(req,res)=>res.status(400).end())
module.exports = router;

