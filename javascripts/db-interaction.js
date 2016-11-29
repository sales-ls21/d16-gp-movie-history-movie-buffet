"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    input = $("#input"),
    user = require('./userLogin'),
    rated = [];
    $("#unwatchedMovie").hide();
    $("#watchedMovie").hide();
    $("#favoriteMovie").hide();

//--------------------{ Auto-Search on Keyup Functionality }-----------------------//
input.keyup(function() {
    instantAdd();
});

function instantAdd() {
    // console.log('instant add running');
    $("#movieWrap").html("");
    if (input.val().length >= 2) { //-----------------> (2 character minimum option)
        getMovies(input.val());
    } else {
        return;
    }
}

input.keydown(function(e) {
    if (e.keyCode === 13) {
        $("#movieWrap").html("");
        getMovies(input.val());
    }
});
//--------------------{ Search for movies w/ User Input }------------------------//
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
//--------------------{ Send Individual Movie OBJ to actors() }------------------------//
function domPop(data) {
  // console.log("data search (data)" , data.Search);
  for (var i = 0; i < data.Search.length; i++) {
      if (data.Search[i].Type === "movie") {
          actors(data.Search[i].imdbID);
          // actors(movies);
      } else {
          return;
      }
    }
  }

//--------------------{ Add to Collection BTN }------------------------//
  $(document).on("click", ".adder", function(event){
    if(event.target.className === "adder")
    searchID(event.target.parentElement.id);
  });

//--------------------{ Get Movie by ID - ADDS ACTORS to OBJ }------------------------//
function actors(movieID){
  $.ajax({
        url: `http://www.omdbapi.com/?i=${movieID}&plot=short&r=json`
    }).done(function(data) {
        console.log("movies w/ actors" , data); //-------------> USEFUL!
        // resolve(data);
        domPopForReal(data);
  });
}

//--------------------{ Populating Dom with Cards }------------------------//
function domPopForReal(data) {
  console.log("data domPop", data);

  if (data.Poster === "N/A") {
    return;
  } else {
      $("#movieWrap").append(`<div id=${data.imdbID} class="col-md-4 cards"><img class="poster" src="${data.Poster}"><h3 class="title">${data.Title}</h3><h3 class="year">${data.Year}</h3><h3 class="actors">${data.Actors}</h3><button class="adder" type="button">Add to Collection</button></div>`);
  }
}

function searchID(ID) {
    // console.log("searchID ARG", ID);
     $.ajax({
        url: `http://www.omdbapi.com/?i=${ID}&plot=short&r=json`
    }).done(function(data) {
       // console.log("search data", data);
       addMovies(data);
    });
}
//--------------------{ Checking for User log In }------------------------//
function addMovies(data){
  // console.log("this one" ,user.getUser());
  if(user.getUser() !== null){
    data.watched = false;
    data.userRating = 0;
    console.log("Added Movie: ", data.userRating);
    addForReal(data);
  }
  else{
    alert("Please Register");
  }
}
//--------------------{ Getting Data from API }------------------------//
function addForReal(data){
  console.log("Add For Real Data" , data);
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

//Function to populate unwatched movies

function getUnwatched(){
  let currentUser = user.getUser();
  console.log(currentUser);
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `https://movie-buffet.firebaseio.com/movie-buffet.json?orderBy="uid"&equalTo="${currentUser}"`
    }).done(function(data){
      resolve(data);
    });
  });
}

function updateMovie(id, uRating){
  let currentUser = user.getUser();
  let firebaseID = id;
  let updatedRating = {userRating: uRating, watched: true, firebaseID: firebaseID};
  let movieID = event.target.parentNode.id;
  console.log("Firebase ID to Update: ", firebaseID);
  console.log("Rating to Give: ", updatedRating);
    return new Promise(function(resolve, reject){
      $.ajax({
        url: `https://movie-buffet.firebaseio.com/movie-buffet/${firebaseID}.json`,
        type: "PATCH",
        data: JSON.stringify(updatedRating)
      }).done(function(data){
        resolve(data);
        console.log("data FIREBASEID", data);
      });
    });
}

// Function for getting Watched movies
function getWatched(){
  let currentUser = user.getUser();
  console.log(currentUser);
  return new Promise(function(resolve, reject){
    $.ajax({
    url: `https://movie-buffet.firebaseio.com/movie-buffet.json`,
    }).done(function(data){
      resolve(data);
    });
  });
}

// Function for Deleting movies from Firebase
function deleteMovie(movie) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `https://movie-buffet.firebaseio.com/movie-buffet/${movie}.json`,
      method: 'DELETE'
    }).done(function() {
      resolve();
    });
  });
}

module.exports = {getMovies, addMovies, getUnwatched, updateMovie, getWatched, deleteMovie};