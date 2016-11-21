"use strict";

let firebase = require("firebase/app"),
    fb = require("./firebaseGetter"),
    fbData = fb();

require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: fbData.key,
  authDomain: fbData.url
};

firebase.initializeApp(config);

module.exports = firebase;
