var express = require('express');
const axios = require("axios");
var router = express.Router();
const url = "http://localhost:8080/";

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get(url).then(response => {
    var options = {
      title: response.data,
      notas: null
    };
    axios.get(url + "nota/all").then(notas => {
      options.notas = notas.data;
      res.render('index', options);
      console.log(notas.data);
    });
  }).catch(error => {
    console.log(error);
  });
});

module.exports = router;
