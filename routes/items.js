var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');




router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded




/* get method for fetch all items. */
router.get('/', function(req, res, next) {
  var sql = "select * from innodb.Items";

  // query the data base
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(rows)
  })
console.log("Client asked for items")
});




/*post method for create an item*/
router.post('/create', function(req, res, next) {
  var title = req.body.title;
  var desc = req.body.desc;
  var price = req.body.price;
  var img = req.body.img;
  
  console.log("Client asked to add an item", req.body)
  var sql = `INSERT INTO innodb.Items (title, desc, price, img) VALUES ("${title}", "${desc}", "${price}", "${img}")`;
  console.log("query to db is:"+ sql)

  // query the data base
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success', id: result.insertId})
  })
});



/*rest api to delete record from mysql database*/
router.delete('/delete', function(req, res, next) {

  console.log("Client asked to delete" , req.query.id)
  var sql = `DELETE FROM employee WHERE id=${req.query.id}`
  console.log("query to db is:"+ sql)
  
  // query the data base
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
});

module.exports = router;