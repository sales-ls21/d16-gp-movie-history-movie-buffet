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