"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    input = $("#input");

input.keyup(function() {
    instantAdd();
});

function instantAdd() {
    console.log('instant add running');
    $("#movieWrap").html("");
    if (input.val().length >= 2) { //-----------------> input.val().length > 3 // (3 character minimum option)
        getMovies(input.val());
    } else {
        return;
    }
}



input.keydown(function(e) {
    if (e.keyCode == 13) {
        $("#movieWrap").html("");
        getMovies(input.val());
    }
});

function getMovies(input) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `http://www.omdbapi.com/?s=${input}`
        }).done(function(data) {
            console.log("this" , data);
            resolve(data);
            domPop(data);
        });
    });

}

function domPop(data) {
    var imdb = Math.floor(data.imdbRating / 2);
    console.log("data" , data.Search);
    for (var i = 0; i < data.Search.length; i++) {
        if (data.Search[i].Type === "movie") {
            $("#movieWrap").append(`<div class="col-md-4"><img src="${data.Search[i].Poster}"><h2>${data.Search[i].Title}</h2><h3>${data.Search[i].Year}</h3><h3>${data.Search[i].Actors}</h3><h3>${data.Search[i].imdbID}</h3><button id="add" type="button">Add to Collection</button></div>`);
        } else {
            return;
        }

    }
}

module.exports = getMovies;