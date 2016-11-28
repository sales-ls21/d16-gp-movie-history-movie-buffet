"use strict";
let $ = require('jquery'),
	firebase = require("./firebaseConfig"),
	provider = new firebase.auth.GoogleAuthProvider(),
	currentUser = null;

firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
		currentUser = user.uid;
		$('#auth-btn').hide();
		$('#logout').show();
		$('#userFeatures').show();
		console.log("currentUser logged in?", currentUser);
	} else {
		currentUser = null;
		$('#logout').hide();
		$('#userFeatures').hide();
		$('#auth-btn').show();
		console.log("currentUser logged out?", currentUser);
	}
});


function logInGoogle() {
	console.log("wazzup");
	return firebase.auth().signInWithPopup(provider);
}

function logOut () {
	return firebase.auth().signOut();
}

function createUser(data){
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
function getUser () {
	return currentUser;
}

module.exports = {logInGoogle, logOut, getUser , createUser};
