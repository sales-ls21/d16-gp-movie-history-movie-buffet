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

$("#unwatched").click(function(data){
  db.getUnwatched().then(function(data){
    let unwatched = [];
    for (var prop in data){
      unwatched.push(data[prop]);
    }
    console.log("data array", unwatched);
    $(unwatched).each(function(i){
      console.log(unwatched[i]);
      var domInfo = `<div id=${unwatched[i].imdbID} class='col-md-4 cards'><img class="poster" src='${unwatched[i].Poster}'><h3 class='title'>${unwatched[i].Title}</h3><h3 class='year'>${unwatched[i].Year}</h3><h3 class='actors'>${unwatched[i].Actors}</h3><label>Rate This Movie</label><select class='rater' type='button'><option value='1'>1 Star</option><option value='2'>2 Stars</option><option>3 Stars</option><option>4 Stars</option><option>5 Stars</option><option>6 Stars</option><option>7 Stars</option><option>8 Stars</option><option>9 Stars</option><option>10 Stars</option></select></div>`;
      $("#unwatchedMovie").append(domInfo);    
    });
    $(".adder").hide();
    $(".rater").change(db.updateMovie);
  });
});
 // <li id="main" role="presentation"><a href="#">Untracked</a></li>
 //         <li id="unwatched" role="presentation"><a href="#">Unwatched</a></li>
 //         <li id="watched" role="presentation"><a href="#">Watched</a></li>
 //         <li id="favories" role="presentation"><a href="#">Favorites</a></li>