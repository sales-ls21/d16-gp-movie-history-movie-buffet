"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    input = $("#input"),
    user = require('./userLogin');

input.keyup(function() {
    instantAdd();
});


//--------------------Function for Auto Complete-----------------------//
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
//--------------------API for Movies------------------------//
function getMovies(input) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `http://www.omdbapi.com/?s=${input}`
        }).done(function(data) {
          data.uid = user.getUser();
            resolve(data);
            // console.log("getMovies" , data); //---------------> USEFUL!
            domPop(data);
        });
    });

}
//--------------------loop for douplicates------------------------//
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
//--------------------API for actor names------------------------//
function actors(movieID){
  $.ajax({
        url: `http://www.omdbapi.com/?i=${movieID}&plot=short&r=json`
    }).done(function(data) {
        // console.log("movies w/ actors" , data); //-------------> USEFUL! 
        // resolve(data);
        domPopForReal(data);
  });
}
//--------------------Populating Dom with Cards------------------------//
function domPopForReal(data) {
	if (data.Poster === "N/A") {
		return;
	} else {
      $("#movieWrap").append(`<div class="col-md-4 cards"><img class="poster" src="${data.Poster}"><h3 class="title">${data.Title}</h3><h3 class="year">${data.Year}</h3><h3 class="actors">${data.Actors}</h3><button class="adder" type="button">Add to Collection</button></div>`);
	}
  //--------------------Add to Collection------------------------//
  $(".adder").click(function(event){
  console.log("evenet" , this);
  $(this).hide();
  addMovies(data);
});
}
//--------------------Checking for User log In------------------------//
function addMovies(data){
  console.log("this one" ,user.getUser());
  if(user.getUser() !== null){
    addForReal(data);  }
  else{
    alert("Please Register");
  }
}
//--------------------Getting Data from API------------------------//
function addForReal(data){
  console.log("Data" , data);
  data.uid = user.getUser();
  return new Promise(function(resolve, reject){
    $.ajax({
      url:`https://movie-buffet.firebaseio.com/movie-buffet.json`,
      type:'POST',
      data: JSON.stringify(data),
      dataType: 'json'
    }).done(function(data){
      resolve(data);
    });
  });
}


module.exports = {getMovies, addMovies};