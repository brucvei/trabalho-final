var express = require('express');
const axios = require("axios");
var router = express.Router();
const url = "http://localhost:8080";
const options = {
  title: "",
  notas: null,
  impostos: {
    issqn: null,
    icms: {
      COFINS: null,
      BCST: null,
      Prod: null,
      Seg: null,
      NF: null,
      PIS: null,
      BC: null,
      ST: null,
      ICMS: null,
      II: null,
      Desc: null,
      Outro: null,
      IPI: null,
      Frete: null,
    },
    tributos: null
  },
};

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get(url).then(response => {
    options.title = response.data;
    axios.get(url + "/nota/all").then(notas => {
      options.notas = notas.data;
      axios.get(url + "/issqn").then(issqn => {
        options.impostos.issqn = issqn.data;
        axios.get(url + "/icms").then(icms => {
          options.impostos.icms = icms.data;
          axios.get(url + "/tributos").then(tributos => {
            options.impostos.tributos = tributos.data;
            res.render('index', options);
          });
        });
      });
    });
  }).catch(error => {
    console.log(error);
    res.render('index', { title: 'Error' });
  });
});

module.exports = router;
