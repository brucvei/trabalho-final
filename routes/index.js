var express = require('express');
const axios = require("axios");
var router = express.Router();
const url = "http://localhost:8080";
const options = {
  title: "",
  qntdNotas: null,
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
  valorProdutos: null,
  valorFrete: null,
  qntdProdutos: null,
  produtos: [{
    nNf: null,
    cProd: null,
    cEAN: null,
    xProd: null,
    NCM: null,
    CFOP: null,
    uCom: null,
    qCom: null,
    vUnCom: null,
    vProd: null,
    cEANTrib: null,
    uTrib: null,
    qTrib: null,
    vUnTrib: null,
    indTot: null
  }],
};

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get(url).then(response => {
    options.title = response.data;
    axios.get(url + "/nota/quantidade").then(notas => {
      options.qntdNotas = notas.data;
      axios.get(url + "/nota/all").then(notas => {
        options.notas = notas.data;
        axios.get(url + "/issqn").then(issqn => {
          options.impostos.issqn = issqn.data;
          axios.get(url + "/icms").then(icms => {
            options.impostos.icms = icms.data;
            axios.get(url + "/tributos").then(tributos => {
              options.impostos.tributos = tributos.data;
              axios.get(url + "/produtos/valor-total").then(valorProdutos => {
                options.valorProdutos = valorProdutos.data;
                axios.get(url + "/frete").then(valorFrete => {
                  options.valorFrete = valorFrete.data;
                  axios.get(url + "/produtos/quantidade").then(qntdProdutos => {
                    options.qntdProdutos = qntdProdutos.data;
                    axios.get(url + "/produtos").then(produtos => {
                      options.produtos = produtos.data;
                      console.log(options.produtos)
                      res.render('index', options);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }).catch(error => {
    console.log(error);
    res.render('index', {title: 'Error'});
  });
});

module.exports = router;
