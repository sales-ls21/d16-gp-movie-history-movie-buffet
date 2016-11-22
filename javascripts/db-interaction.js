"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    input = $("#input");

input.keyup(function() {
    instantAdd();
});

function instantAdd() {
    // console.log('instant add running');
    $("#movieWrap").html("");
    if (input.val().length >= 2) { //-----------------> input.val().length > 3 // (3 character minimum option)
        getMovies(input.val());
    } else {
        return;
    }
}

input.keydown(function(e) {
    if (e.keyCode == 13) {
        $("#movieWrap").html("");
        getMovies(input.val());
    }
});

function getMovies(input) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `http://www.omdbapi.com/?s=${input}`
        }).done(function(data) {
            resolve(data);
            // console.log("getMovies" , data); //---------------> USEFUL!
            domPop(data);
        });
    });

}

function domPop(data) {
  // var imdb = Math.floor(data.imdbRating / 2);
  // console.log("data" , data.Search);
  let movies = [];
  for (var i = 0; i < data.Search.length; i++) {
      if (data.Search[i].Type === "movie") {
          actors(data.Search[i].imdbID);
          // actors(movies);
      } else {
          return;
      }
    }
  }

function actors(movieID){
  $.ajax({
        url: `http://www.omdbapi.com/?i=${movieID}&plot=short&r=json`
    }).done(function(data) {
        // console.log("movies w/ actors" , data); //-------------> USEFUL! 
        // resolve(data);
        domPopForReal(data);
  });
}

function domPopForReal(data) {
	if (data.Poster === "N/A") {
		return;
	} else {
      $("#movieWrap").append(`<div class="col-md-4"><img src="${data.Poster}"><h2>${data.Title}</h2><h3>${data.Year}</h3><h3>${data.Actors}</h3><button id="add" type="button">Add to Collection</button></div>`);
	}
}

module.exports = getMovies;