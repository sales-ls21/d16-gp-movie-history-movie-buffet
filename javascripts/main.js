"use strict";
let $ = require('jquery'),
	db = require("./db-interaction"),
	user = require('./userLogin');

$('#userFeatures').hide();
$('#logout').hide();

$("#auth-btn").click(function() {
  console.log("clicked auth");
  user.logInGoogle()
  .then(function(result) {
    let user = result.user;
    console.log("logged in user", user.uid);
    $("#auth-btn").hide();
    $("#logout").show();
    $('#userFeatures').show();
  });
});

$('#logout').click(function() {
  console.log("clicked logout");
  user.logOut();
  $('#auth-btn').show();
  $('#logout').hide();
  $('#userFeatures').hide();
});