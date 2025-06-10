const basic = require('../../Service/newBasicRecordService');

async function insertRecord(req,res){
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

async function getRecordTypesNum(req, res){
    try{
        const result = await basic.getRecordTypes();
        res.status(200);
        res.json({
            "status" : "success",
            "Result" : result //what appears in dbeaver when you make the request, literally the rows your asking for 
        })
    }catch(error) {
        let jsonError = {
            "status" : "Error",
            "message" : error.message 
        };
        console.log(error);
        res.status(500).send(jsonError);
    }
}

module.exports = {
    insertRecord,
    getRecordTypesNum
};