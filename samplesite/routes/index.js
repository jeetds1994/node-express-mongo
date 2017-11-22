var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res) {
  console.log("yes")

  var mongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/samplesite'

  mongoClient.connect(url, function(err, db){
    if(err){
      console.log("unable to connect to the server", err)

    }else{
      console.log("connection success")

      var collection = db.collection("students")

      collection.find({}).toArray(function(err, result){
        if(err){
          res.send(err)
        }else if(result.length){
          res.render("studentlist", {
            "studentlist": result
          })
        }else{
          res.send("nothing was found")
        }

        db.close()
      })
    }
  })
});


router.get('/newstudent', function(req, res) {
  res.render('newstudent', { title: 'Add Student' });
});

router.post('/addstudent', function(req, res) {
  var mongoClient = mongodb.MongoClient;
  
  var url = 'mongodb://localhost:27017/samplesite'

  mongoClient.connect(url, function(err, db){
    if(err){
      console.log("post error")
    }else{
      console.log("successful connection")

      var collection = db.collection("students")
      var student1 = {student: req.body.student, street: req.body.street,
        city: req.body.city, state: req.body.state, sex: req.body.sex,
        gpa: req.body.gpa};

      collection.insert([student1], function(err, res){
        if(err){
          console.log(err)
        }else{
          res.redirect("thelist")
        }
      })

        
    }
  })
  
});


module.exports = router;
