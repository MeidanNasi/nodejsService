var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var fs = require('fs');

router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded




/* get method for fetch all items. */
router.get('/', function(req, res, next) {
  var sql = "select * from innodb.Items";

  // query the data base
  db.query(sql, function(err, rows, fields) {
    if (err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    console.log(rows)
    res.json(rows)
  })
console.log("Client asked for items")
});


/*post method for create an item*/
router.post('/create', function(req, res, next) {
  const id = req.body.id;
  const title = req.body.title;
  const desc = req.body.desc;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const url = req.body.url;
  
  console.log("Client asked to add an item", req.body)

  const query ="INSERT INTO `innodb`.`Items` (`id`, `title`, `desc`, `price`, `img`, `quantity`) VALUES"+`('${id}', '${title}', '${desc}', '${price}', '${url}' , '${quantity}' )`
  console.log("query to db is:"+ query)

  // query the data base
  db.query(query,function(err, result) {
    if(err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
});

/*rest api to delete record from mysql database*/
router.delete('/delete', function(req, res, next) {
  console.log("Client asked to delete" , req.query.id)
  var sql = `DELETE FROM Items WHERE id=${req.query.id}`
  console.log("query to db is:"+ sql)
  
  // query the data base
  db.query(sql, function(err, result) {
    if(err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
});

/*get method for fetch single product*/
router.get('/id', function(req, res, next) {
  var id = req.query.id;
  console.log(id)

  var sql = `SELECT * FROM Items WHERE id=${id}`;
  db.query(sql, function(err, row, fields) {
    if(err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    res.json(row[0])
  })
});

/*put method for update product*/
router.put('/update/id', function(req, res, next) {
  console.log(req)
  var id = req.body.id;
  var quantity = (req.body.quantity) ;

  var sql = `UPDATE Items SET quantity="${quantity}" WHERE id=${id}`;
  db.query(sql, function(err, result) {
    if(err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
});

module.exports = router;