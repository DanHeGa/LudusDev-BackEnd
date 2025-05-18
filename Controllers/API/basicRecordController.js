const basic = require('../../Service/newBasicRecordService');

async function insertUser(req,res){
    try{       
        let record = req.body;
        const result = await basic.newRecord(record);
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.changes,
            "gen_id" : result.gen_id
        });
    }catch(error){
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}

module.exports = {insertUser};