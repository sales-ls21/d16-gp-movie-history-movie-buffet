"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    input = $("#input");

 // input.keyup(function () {instantAdd();});

 function instantAdd () {
 	console.log('instant add running');
    if (input.val()) { //-----------------> input.val().length > 3 // (3 character minimum option)
  getMovies(input.val());
    } else {
      return;
    }
  }

$("#submit").click(function() {getMovies(input.val());});

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
	var imdb = Math.floor(data.imdbRating / 2);
	$("#movieWrap").html(`<div class="col-md-4"><img src="${data.Poster}"><h2>${data.Title}</h2><h3>${data.Director}</h3><h3>${data.Released}</h3><h3>${data.Actors}</h3><h3>${imdb}</h3></div>`);
}

module.exports = getMovies;