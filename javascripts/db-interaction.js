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
		console.log("TRENT WE LOGGIN");
		$.ajax({
			url:`http://www.omdbapi.com/?t=${input}&y=&plot=short&r=json`
		}).done(function(data){
			console.log(data);
			resolve(data);
		});
	});

}


module.exports = getMovies;