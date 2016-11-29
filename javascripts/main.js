"use strict";
let $ = require('jquery'),
	db = require("./db-interaction"),
	user = require('./userLogin'),
  unwatched = [],
  unwatchedID,
  idArray = [],
  arrayRating = [];

// $('#favorites').hide();

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
  $('#favorites').show();
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
    for (var prop in data){
      // console.log("prop", prop);
      data[prop].firebaseID = prop;
      unwatched.push(data[prop]);
    }
    console.log("data array", unwatched);
    $(unwatched).each(function(i){
      console.log(unwatched[i]);
      var domInfo = `<div id=${unwatched[i].firebaseID} class='col-md-4 cards'><img class="poster" src='${unwatched[i].Poster}'><h3 class='title'>${unwatched[i].Title}</h3><h3 class='year'>${unwatched[i].Year}</h3><h3 class='actors'>${unwatched[i].Actors}</h3><label>Rate This Movie</label><select class='rater' type='button'><option value='1'>1 Star</option><option value='2'>2</option><option>3 Stars</option><option>4 Stars</option><option>5 Stars</option><option>6 Stars</option><option>7 Stars</option><option>8 Stars</option><option>9 Stars</option><option>10 Stars</option></select></div>`;
      $("#unwatchedMovie").append(domInfo);
    $(".adder").hide();
      $(".rater").change(function() {
        let uRating = $(event.target).val();
        let matchTitle = unwatched[i].Title;
        let eventID = event.target.parentNode.id;
        unwatchedID = unwatched[i].firebaseID;
          if (eventID === unwatchedID) {
            console.log("Title to Rate: ", matchTitle);
            db.updateMovie(unwatchedID, uRating);
        }
        event.target.parentNode.remove();
      });

    });
  });
});

// 'Watched' click event
$('#watched').click(function() {
  db.getWatched().then(function(data) {
    let watched = [];
    let userWatched = [];
    for (var prop in data){
      watched.push(data[prop]);
    }
    $(watched).each(function(i) {
      if (watched[i].uid === user.getUser() && watched[i].watched === true) {
        userWatched.push(watched[i]);
        console.log('userWatched', userWatched);
      }
    });
        populateWatched(userWatched);
  });
});

// Function populating Main view
function populateWatched(data) {
  $(data).each(function(i) {
  let cardBuild = `<div id=${data[i].imdbID} class='col-md-4 cards'><img class="poster" src='${data[i].Poster}'><h3 id=${data[i].userRating} class='title'>${data[i].Title}</h3><h3 class='year'>${data[i].Year}</h3><h3 class='plot'>${data[i].Plot}</h3><button id=${data[i].firebaseID} class='delete'>DELETE</button></div>`;
  $('#watchedMovie').append(cardBuild);
  });
  $('.delete').click(function(){
    event.target.parentNode.remove();
    let movieToDelete = event.target.id;
    db.deleteMovie(movieToDelete);
  });
}

// Checking + filtering ratings
  $('#dropdown').change(function() {
   arrayRating = ($('h3.title'));
   console.log("Arrayrating", arrayRating);
   for (var i = 0; i < arrayRating.length; i++) {
    console.log("arrayRating[i].id", arrayRating[i].id);
    if (arrayRating[i].id < $('#dropdown').val()) {
      console.log("something");
      console.log("parent node", arrayRating[i].parentNode);
      $(arrayRating[i]).parent().hide();
    } else if (arrayRating[i].id !== '10' && $('#dropdown').val() === '10') {
        $(arrayRating[i]).parent().hide();
    }
   }
  });

 // <li id="main" role="presentation"><a href="#">Untracked</a></li>
 //         <li id="unwatched" role="presentation"><a href="#">Unwatched</a></li>
 //         <li id="watched" role="presentation"><a href="#">Watched</a></li>
 //         <li id="favories" role="presentation"><a href="#">Favorites</a></li>