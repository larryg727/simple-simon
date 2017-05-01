/**
 * Created by larryg on 5/1/17.
 */
"use strict";
$(document).ready(function () {
    var key = [];       // this will be the game generated array
    var userEntry = [];  // this will be the user entered array
    var randomNumber; //declaring as global variable
    var idVar;


    //start button. here we go..
    $("#start").click(function () {
        key.length = 0;    // resets for new game
        gameRound();

    });

    //generate new random number function
    function randomGenerator() {
        randomNumber = Math.floor((Math.random() * 4) + 1);
        console.log("random number " + randomNumber);
    }

    // add new entry to answer key
    function addToKey() {
        key.push(randomNumber);
        console.log("key array " + key);
    }

    // shows the player the current key
    function playKey() {

        key.forEach(function (el, i) {
            var play = ".a-" + key[i];
            setTimeout(function () {
                $(play).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 900);
            }, (i + "700"));
        })
    }

    // lets the user enter their selection
    function userInput() {
        $(".selectors").click(function() {
            $(this).children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 700);
            idVar = $(this).attr("id").split("-");
            userEntry.push(idVar[1]);
            console.log("button pushed " + idVar[1]);
            console.log("user array " + userEntry);

            // if they have entered as many entries as the key it will check answer. if not they can continue to input
            if (userEntry.length === key.length) {
                console.log(userEntry.length);
                console.log(key.length);
                $(".selectors").off();
                checkAnswer();
            }
        })
    }

    // function to check answer
    function checkAnswer() {
        var answer = key.join(", ");
        var check = userEntry.join(", ");
        console.log("answer string " + answer);
        console.log("check string " + check);
        if (answer === check) {
            console.log("correct");
            gameRound();
        } else {
            console.log("what a looser!");
        }
    }

    // function to add all function for a game round
    function gameRound() {
        userEntry.length = 0; // clears previous round entry
        setTimeout(function () {
            randomGenerator();
            addToKey();
            playKey();
            userInput();
        }, 1500);
    }


});