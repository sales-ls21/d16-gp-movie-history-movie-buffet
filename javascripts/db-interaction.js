"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    input = $("#input");

 input.keyup(function () {instantAdd();});

 function instantAdd () {
 	console.log('instant add running');
    if (input.val()) { //-----------------> input.val().length > 3 // (3 character minimum option)
  getMovies(input.val());
    } else {
      return;
    }
  }

$("#search").click(function() {getMovies(input.val());});

function getMovies(input) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url:`http://www.omdbapi.com/?t=${input}&y=&plot=short&r=json`
		}).done(function(data){
			console.log(data);
			domPop(data);
			resolve(data);
		});
	});

}

function domPop(data){
	$("#movieWrap").html(`<div class="col-md-4"><h2>${data.name}</h2>`);
}

module.exports = getMovies;