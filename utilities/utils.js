const get_limit_offset = async function(reqObject){
    let pageLimit = 10;
    if(reqObject.query.page){
        let curr_page = reqObject.query.page -1;
        return {limit:pageLimit,offset:pageLimit*curr_page};
    }
    return{limit:pageLimit,offset:0}
}

module.exports = {get_limit_offset}