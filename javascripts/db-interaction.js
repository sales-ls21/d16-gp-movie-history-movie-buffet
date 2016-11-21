"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig");



$("#search").click(getMovies);

function getMovies() {
	// let input = $("#input").val();
	return new Promise(function(resolve, reject){
		console.log("TRENT WE LOGGIN");
		$.ajax({
			url:`http://www.omdbapi.com/?t=pulp+fiction&y=&plot=short&r=json`
		}).done(function(data){
			console.log(data);
			resolve(data);
		});
	});

}


module.exports = getMovies;