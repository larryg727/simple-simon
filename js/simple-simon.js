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
    var level = [200, 500];



    //generate new random number function
    function randomGenerator() {
        randomNumber = Math.floor((Math.random() * 4) + 1);
    }

    // add new entry to answer key
    function addToKey() {
        key.push(randomNumber);
    }

    // shows the player the current key
    function playKey() {

        key.forEach(function (el, i) {
            var play = ".a-" + key[i];
             var sound = "#tone" + key[i];
             var time = i + "000";
            var delay = parseInt(time) - (i * level[0]);
            setTimeout(function () {
                $(sound)[0].play();
                $(play).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, level[1]);
            }, delay);
        })
    }

    // lets the user enter their selection
    function userInput() {
        $(document).keyup(function(event){
            console.log(userEntry);
            switch (event.keyCode) {
                case 65:
                    userEntry.push(1);
                    $("#s-1").children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 700);
                    $("#tone1")[0].play();
                    break;
                case 83:
                    userEntry.push(2);
                    $("#s-2").children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 700);
                    $("#tone2")[0].play();
                    break;
                case 90:
                    userEntry.push(3);
                    $("#s-3").children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 700);
                    $("#tone3")[0].play();
                    break;
                case 88:
                    userEntry.push(4);
                    $("#s-4").children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 700);
                    $("#tone4")[0].play();
                    break;
            }
            if (userEntry.length === key.length) {
                $(document).off();
                checkAnswer();
            }
        });
        $(".selectors").click(function() {
            $(this).children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 500);
            idVar = $(this).attr("id").split("-");
            userEntry.push(idVar[1]);
            setTimeout(function(){
            var sound2 = "#tone" + idVar[1];    // slight delay to enable idvar to be defined
            $(sound2)[0].play();
            }, 50);

            // if they have entered as many entries as the key it will check answer. if not they can continue to input
            if (userEntry.length === key.length) {
                $(".selectors").off();
                checkAnswer();
            }
        })
    }

    // user input function for reverse level
    function userReverseInput() {
        $(".selectors").click(function() {
            $(this).children().last().css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 500);
            idVar = $(this).attr("id").split("-");
            userEntry.push(idVar[1]);
            setTimeout(function(){
                var sound2 = "#tone" + idVar[1];  // slight delay to enable idvar to be defined
                $(sound2)[0].play();
            }, 50);

            // if they have entered as many entries as the key it will check answer. if not they can continue to input
            if (userEntry.length === key.length) {
                $(".selectors").off();
                checkReverseAnswer();
            }
        })
    }

    // function to check answer
    function checkAnswer() {
        var answer = key.join(", ");
        var check = userEntry.join(", ");
        if (answer === check) {
            setTimeout(function(){
                $("#roundBell").prop("volume", 0.25);
                $("#roundBell")[0].play();
            }, 900);
            gameRound();
        } else {
            setTimeout(function(){
                $("#gameOver")[0].play();
            }, 400);
            $("#status").html("<h1>Game Over</h1>");
            finalScore = key.length - 1;
            $("#difficulty").removeAttr("disabled");
            highScoreCheck();
        }
    }

    // function to check answers on reverse level
    function checkReverseAnswer() {
        userEntry.reverse();
        var answer = key.join(", ");
        var check = userEntry.join(", ");
        if (answer === check) {
            setTimeout(function(){
                $("#roundBell").prop("volume", 0.25);
                $("#roundBell")[0].play();
            }, 900);
            gameRoundReverse();
        } else {
            setTimeout(function(){
                $("#gameOver")[0].play();
            }, 400);
            $("#status").html("<h1>Game Over</h1>");
            finalScore = (key.length - 1) * 2;
            $("#difficulty").removeAttr("disabled");

            highScoreCheckReverse();
        }
    }

    // function to add all function for a game round
    function gameRound() {
        userEntry.length = 0; // clears previous round entry
        if (key.length >= 6){      //after round 6 the play sequence speeds up
            level = [500, 300];
        }else if (key.length > 14){
            level = [200, 100];
        }
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
        if (key.length >= 6){      //after round 6 the play sequence speeds up
            level = [500, 300];
        }else if (key.length > 14){
            level = [200, 100];
        }
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