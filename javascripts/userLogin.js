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

function getUser () {
	return currentUser;
}

module.exports = {logInGoogle, logOut, getUser};
