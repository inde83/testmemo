var express = require('express');
var router = express.Router();
var client=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;
var db="mongodb://127.0.0.1:27017/test";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('memo');
});

//MEMO CRUD
//메모 신규 입력
router.post('/memo',function(req,res,next)
{
	client.connect(db,function(err,db)
	{
		if(err)
		{
			res.json({status:1,message:"dbconn err"});
		}else{
			db.collection('memo').insertOne({
				memo:req.body.memo,regdatetime:new Date
			},function(err,doc){
				
				var result={status:0,message:"ok"};
				if(err)
				{
					result.status=2;
					result.message="insert err";
					console.log(err);
				}	
				res.json(result);
				db.close();
			});
			
		}
	});
});
//메모 목록 가져오기
router.get('/memo',function(req,res,next)
{
        client.connect(db,function(err,db)
        {
                if(err)
                {
                        res.json({status:1,message:"dbconn err"});
                }else{
			var cursor=db.collection('memo').find().sort({regdatetime:-1});
			cursor.toArray(function(err,doc){
				console.log(doc);
				var result={status:0,message:"ok"};
				if(err)
				{
					result.status=1;
					result.message="find err";
				}else{
					result.list=doc;
				}
				res.send(result);
				db.close();
			});
		}
	});

});
//메모 수정
router.put('/memo',function(req,res,next){
        client.connect(db,function(err,db)
        {
                if(err)
                {
                        res.json({status:1,message:"dbconn err"});
                }else{
                        db.collection('memo').updateOne(
			{_id:ObjectId(req.body._id)},
			{$set:{memo:req.body.memo}},function(err,doc)
                        {
                                var result={status:0,message:"ok"};
                                if(err)
                                {
                                        result.status=1;
                                        result.message="update  err";
                                }
                                res.json(result);
                                db.close();

                        });
                }

        });	
});
//메모 삭제
router.delete('/memo/:_id',function(req,res,next){
	client.connect(db,function(err,db)
        {
                if(err)
                {
                        res.json({status:1,message:"dbconn err"});
                }else{
			db.collection('memo').deleteOne({_id:ObjectId(req.params._id)},function(err,doc)
			{
			        var result={status:0,message:"ok"};
                                if(err)
                                {
                                        result.status=1;
                                        result.message="delete err";
                                }
                                res.json(result);
                                db.close();
				
			});
		}
		
	});
});
module.exports = router;
