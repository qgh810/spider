var express = require('express');
var request = require('request');
var router = express.Router();
var config = require('../config/index')
var cheerio = require('cheerio')
var url = require('url')

var options = {
  url: config.url
};

var $
var content = ''
var page
var selector = '#u1 a'
var rex = /^http:\/\//
var cnodeUrl = config.url

/* GET home page. */
router.get('/', function(req, res, next) {
  request(options, function (error, response, body) {
    if (error) {
      return console.log(error)
    }
    $ = cheerio.load(body)
    var shopUrls = []
    $(selector).each(function (index, element) {
      var $element = $(element)
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      shopUrls.push(href)
    })
    // var lists = $(selector)
    // for (var i = 0; i < lists.length; i++) {
    //   var href = lists[i].attribs.href
    //   if (rex.test(href)) {
    //     shopUrls.push(lists[i].attribs.href)
    //   }
    // }

    content = shopUrls
    render(res, content)
  })
});

function render (res, jsonContent) {
  res.send(jsonContent)
}

module.exports = router;
