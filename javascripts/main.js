"use strict";
let $ = require('jquery'),
	user = require('./userLogin');

$("#auth-btn").click(function() {
  console.log("clicked auth");
  user.logInGoogle()
  .then(function(result) {
    let user = result.user;
    console.log("logged in user", user.uid);
    $("#auth-btn").hide();
    $("#logout").show();
  });
});