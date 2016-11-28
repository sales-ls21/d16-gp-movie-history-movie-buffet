"use strict";
let $ = require('jquery'),
	db = require("./db-interaction"),
	user = require('./userLogin');


$("#auth-btn").click(function() {
  console.log("clicked auth");
  user.logInGoogle()
  .then(function(result) {
    let user = result.user;
    console.log("logged in user", user.uid);
  });
});

$('#logout').click(function() {
  console.log("clicked logout");
  user.logOut();
});

$("#unwatched").click(function(event){
  $("#movieWrap").hide();
  $("#unwatchedMovie").show();
  $("#pageWrap").show();
  $("#watchedMovie").hide();
  $("#favoriteMovie").hide();
});

$("#watched").click(function(event){
  $("#movieWrap").hide();
  $("#unwatchedMovie").hide();
  $("#pageWrap").show();
  $("#watchedMovie").show();
  $("#favoriteMovie").hide();
});
$("#favories").click(function(event){
  $("#movieWrap").hide();
  $("#unwatchedMovie").hide();
  $("#pageWrap").show();
  $("#watchedMovie").hide();
  $("#favoriteMovie").show();
});
$("#main").click(function(event){
  $("#movieWrap").show();
  $("#unwatchedMovie").hide();
  $("#pageWrap").show();
  $("#watchedMovie").hide();
  $("#favoriteMovie").hide();
});
 // <li id="main" role="presentation"><a href="#">Untracked</a></li>
 //         <li id="unwatched" role="presentation"><a href="#">Unwatched</a></li>
 //         <li id="watched" role="presentation"><a href="#">Watched</a></li>
 //         <li id="favories" role="presentation"><a href="#">Favorites</a></li>