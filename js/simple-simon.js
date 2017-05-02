/**
 * Created by larryg on 5/1/17.
 */
"use strict";
$(document).ready(function () {
    var key = [];       // this will be the game generated array
    var userEntry = [];  // this will be the user entered array
    var randomNumber; //declaring as global variable
    var idVar;
    var highScore = 0;
    var finalScore;




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
             var sound = "#tone" + key[i];
            setTimeout(function () {
                $(sound)[0].play();
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
            setTimeout(function(){
            var sound2 = "#tone" + idVar[1];    // slight delay to enable idvar to be defined
            $(sound2)[0].play();
            }, 50);

            // if they have entered as many entries as the key it will check answer. if not they can continue to input
            if (userEntry.length === key.length) {
                console.log(userEntry.length);
                console.log(key.length);
                $(".selectors").off();
                checkAnswer();
            }
        })
    }

    // user input function for reverse level
    function userReverseInput() {
        $(".selectors").click(function() {
            $(this).children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 700);
            idVar = $(this).attr("id").split("-");
            userEntry.push(idVar[1]);
            console.log("button pushed " + idVar[1]);
            console.log("user array " + userEntry);
            setTimeout(function(){
                var sound2 = "#tone" + idVar[1];  // slight delay to enable idvar to be defined
                $(sound2)[0].play();
            }, 50);

            // if they have entered as many entries as the key it will check answer. if not they can continue to input
            if (userEntry.length === key.length) {
                console.log(userEntry.length);
                console.log(key.length);
                $(".selectors").off();
                checkReverseAnswer();
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
            setTimeout(function(){
                $("#gameOver")[0].play();
            }, 400);
            $("#status").html("<h1>Game Over</h1>");
            finalScore = key.length - 1;
            $("#difficulty").removeAttr("disabled");
            console.log("what a looser!");
            console.log(finalScore);
            highScoreCheck();
        }
    }

    // function to check answers on reverse level
    function checkReverseAnswer() {
        userEntry.reverse();
        var answer = key.join(", ");
        var check = userEntry.join(", ");
        console.log("answer string " + answer);
        console.log("check string " + check);
        if (answer === check) {
            console.log("correct");
            gameRoundReverse();
        } else {
            setTimeout(function(){
                $("#gameOver")[0].play();
            }, 400);
            $("#status").html("<h1>Game Over</h1>");
            finalScore = (key.length - 1) * 2;
            $("#difficulty").removeAttr("disabled");
            console.log("what a looser!");
            console.log(finalScore);
            highScoreCheckReverse();
        }
    }

    // function to add all function for a game round
    function gameRound() {
        userEntry.length = 0; // clears previous round entry
        setTimeout(function () {
            randomGenerator();
            addToKey();
            playKey();
            roundCounter();
            userInput();
        }, 2500);
    }

    // game round for reverse level
    function gameRoundReverse() {
        userEntry.length = 0; // clears previous round entry
        setTimeout(function () {
            randomGenerator();
            addToKey();
            playKey();
            roundCounter();
            userReverseInput();
        }, 2500);
    }

   // brings up click to start animation and start of game click event
   function starter() {
       $("#gameName").on({
           mouseenter: function () {
               $("#status").html("<h1>Click To Start</h1>");
               $("#gameName").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").show();
           },
           click: function () {
               $("#startSound")[0].play();
               $("#status").html("<h1>Ready..</h1>");
               $("#gameName").stop(true, true);
               $("#gameName").show();
               $("#gameName").off();
               $("#difficulty").attr("disabled", "disabled");
               key.length = 0;    // resets for new game
               gameRound();
           }
       });
   }

   //starter function for reverse level
    function starterReverse() {
        $("#gameName").on({
            mouseenter: function () {
                $("#status").html("<h1>Click To Start</h1>");
                $("#gameName").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").fadeOut("slow").fadeIn("slow").show();
            },
            click: function () {
                $("#startSound")[0].play();
                $(".x2").hide();
                $("#status").html("<h1>Repeat in reverse.</h1>");
                $("#gameName").stop(true, true);
                $("#gameName").show();
                $("#gameName").off();
                $("#difficulty").attr("disabled", "disabled");
                key.length = 0;    // resets for new game
                gameRoundReverse();
            }
        });
    }


    function roundCounter(){
        var round = key.length;
        $("#status").html("<h2>Round - " + round + "</h2>");
        $("#status").show();
    }

    function highScoreCheck() {
        if (finalScore > highScore) {
            // $("#gameName").css("top", "38%");
            $("#highScore").html("<h1>New HIGH SCORE!</h1>");
            highScore = finalScore;
            setTimeout(function () {
                $("#highScore").html("<h1>HIGH SCORE: " + highScore + "</h1>")
            }, 3500);
        }
        finalScore = ' ';
        starter();
    }

    // reverse level highscore check
    function highScoreCheckReverse() {
        if (finalScore > highScore) {
            // $("#gameName").css("top", "38%");
            $("#highScore").html("<h1>New HIGH SCORE!</h1>");
            highScore = finalScore;
            setTimeout(function () {
                $("#highScore").html("<h1>HIGH SCORE: " + highScore + "</h1>")
            }, 3500);
        }
        finalScore = ' ';
        starterReverse();
    }
    var i = 0;
    //selector for difficulty
    $("#difficulty").change(function() {
        i++ ; //keep track of number of toggles
        console.log("value of i " + i);
        $("body").toggleClass("reverse");  //reversing css on page
        $(".dummy").toggleClass("active");
        $(".x2").toggle();
        $("#gameName").off(); //cancels previous click event to start regular game
        // to determine if toggle is on simple or reverse
        if (i % 2 === 0){
            starter();
        } else {
            starterReverse();
        }
    });



starter();
});