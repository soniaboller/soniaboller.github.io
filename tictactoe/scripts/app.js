var gameBoard = [[null, null, null],
                 [null, null, null],
                 [null, null, null]];
var turn = 1;
var hillaryImage = '<img src = "images/clinton.svg" class = "clinton" />'; 
var trumpImage = '<img src = "images/trump.svg" class = "trump" />';

// listen for click on boxes, loop through

var resetGame = function() {
    $('#reset').one("click", function(){
        location.reload();
    })
};

var trumpWins = function () {
    $('#winner-box').html("TRUMP WINS");
    $('#winner-box').append("<button id='reset'>PLAY AGAIN!?</button>");
    return true;
};

var clintonWins = function () {
    $('#winner-box').html("HALLELUJAH HILLDAWG WINS");
    $('#winner-box').append("<button id='reset'>PLAY AGAIN!?</button>");
    return true;
};

var gamePlay = function (){
    $('#boxA').one("click", function(){
        if(turn % 2 === 0){
            $('#boxA').append(trumpImage);
            gameBoard[0][0] = 0;
            console.log("box A is " + gameBoard[0][0]);
        }
        else {
            $('#boxA').append(hillaryImage);
            gameBoard[0][0] = 1;
            console.log("box A is " + gameBoard[0][0]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxB').one("click", function(){
        if(turn % 2 === 0){
            $('#boxB').append(trumpImage);
            gameBoard[0][1] = 0;
            console.log("box B is " + gameBoard[0][1]);
        }
        else {
            $('#boxB').append(hillaryImage);
            gameBoard[0][1] = 1;
            console.log("box B is " + gameBoard[0][1]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxC').one("click", function(){
        if(turn % 2 === 0){
            $('#boxC').append(trumpImage);
            gameBoard[0][2] = 0;
            console.log("box C is " + gameBoard[0][2]);

        }
        else {
            $('#boxC').append(hillaryImage);
            gameBoard[0][2] = 1;
            console.log("box C is " + gameBoard[0][2]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxD').one("click", function(){
        if(turn % 2 === 0){
            $('#boxD').append(trumpImage);
            gameBoard[1][0] = 0;
            console.log("box D is " + gameBoard[1][0]);

        }
        else {
            $('#boxD').append(hillaryImage);
            gameBoard[1][0] = 1;
            console.log("box D is " + gameBoard[1][0]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxE').one("click", function(){
        if(turn % 2 === 0){
            $('#boxE').append(trumpImage);
            gameBoard[1][1] = 0;
            console.log("box E is " + gameBoard[1][1]);

        }
        else {
            $('#boxE').append(hillaryImage);
            gameBoard[1][1] = 1;
            console.log("box E is " + gameBoard[1][1]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxF').one("click", function(){
        if(turn % 2 === 0){
            $('#boxF').append(trumpImage);
            gameBoard[1][2] = 0;
            console.log("box F is "+ gameBoard[1][2]);

        }
        else {
            $('#boxF').append(hillaryImage);
            gameBoard[1][2] = 1;
            console.log("box F is "+ gameBoard[1][2]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxG').one("click", function(){
        if(turn % 2 === 0){
            $('#boxG').append(trumpImage);
            gameBoard[2][0] = 0;
            console.log("box G is "+ gameBoard[2][0]);

        }
        else {
            $('#boxG').append(hillaryImage);
            gameBoard[2][0] = 1;
            console.log("box G is "+ gameBoard[2][0]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxH').one("click", function(){
        if(turn % 2 === 0){
            $('#boxH').append(trumpImage);
            gameBoard[2][1] = 0;
            console.log("box H is "+ gameBoard[2][1]);

        }
        else {
            $('#boxH').append(hillaryImage);
            gameBoard[2][1] = 1;
            console.log("box H is "+ gameBoard[2][1]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
    $('#boxI').one("click", function(){
        if(turn % 2 === 0){
            $('#boxI').append(trumpImage);
            gameBoard[2][2] = 0;
            console.log("box I is "+ gameBoard[2][2]);

        }
        else {
            $('#boxI').append(hillaryImage);
            gameBoard[2][2] = 1;
            console.log("box I is "+ gameBoard[2][2]);
        }
        turn++;
        checkTie();
        checkRowWinner();
        checkColumnWinner();
        checkDiagonalWinner();
    });
};

// var checkWinner = function(){
//     checkRowWinner();
//     //checkRowWinner2();
//     checkColumnWinner();
//     checkDiagonalWinner();
//     if (checkRowWinner() === true || checkColumnWinner() === true || checkDiagonalWinner() === true){
//         alert('trump wins, aHALP!');//
//     }
//     else if (checkRowWinner() === false || checkColumnWinner() === false || checkDiagonalWinner() === false){
//         alert('clinton wins thank gawWwwd!!');
//     }
//     // else {
//     //     alert('kanye for prezzzz');
//     // }
// };

gamePlay();
checkRowWinner = function(){
    if (gameBoard[0][0] === 0  && gameBoard[0][1] === 0 && gameBoard [0][2] === 0){
        console.log('0 wins row 1');
        trumpWins();
    }
    else if (gameBoard[0][0] === 1  && gameBoard[0][1] === 1 && gameBoard [0][2] === 1){
        console.log('1 wins row 1');
        clintonWins();
    }
    else if (gameBoard[1][0] === 0  && gameBoard[1][1] === 0 && gameBoard [1][2] === 0){
        console.log('0 wins row 2');
        trumpWins();
    }
    else if (gameBoard[1][0] === 1  && gameBoard[1][1] === 1 && gameBoard [1][2] === 1){
        console.log('1 wins row 2');
        clintonWins();
    }
    else if (gameBoard[2][0] === 0  && gameBoard[2][1] === 0 && gameBoard [2][2] === 0){
        console.log('0 wins row 3');
        trumpWins();
    }
    else if (gameBoard[2][0] === 1  && gameBoard[2][1] === 1 && gameBoard [2][2] === 1){
        console.log('1 wins row 3');
        clintonWins();
    }
    else {
        console.log('no row winner');
    }
    resetGame();
};

// var checkRowWinner2 = function () {
//     for (var i = 0; i < gameBoard.length; i++){
//         if (gameBoard[i][0] === 0 && gameBoard[i][1] === 0 && gameBoard[i][2] === 0){
//                 console.log('0 wins row');
//         }
//         else if (gameBoard[i][0] === 1 && gameBoard[i][1] === 1 && gameBoard[i][2] === 1){
//             console.log('1 wins row');
//         }
//         else {
//             console.log('no row winner');
//         }
//     }
// };

var checkColumnWinner = function(){
    if (gameBoard[0][0] === 0  && gameBoard[1][0] === 0 && gameBoard [2][0] === 0){
        console.log('0 wins column1');
        trumpWins();
    }
    else if (gameBoard[0][0] === 1  && gameBoard[1][0] === 1 && gameBoard [2][0] === 1){
        console.log('1 wins column1');
        clintonWins();
    }
    else if (gameBoard[0][1] === 0  && gameBoard[1][1] === 0 && gameBoard [2][1] === 0){
        console.log('0 wins column2');
        trumpWins();
    }
    else if (gameBoard[0][1] === 1  && gameBoard[1][1] === 1 && gameBoard [2][1] === 1){
        console.log('1 wins column2');
        clintonWins();
    }
    else if (gameBoard[0][2] === 0  && gameBoard[1][2] === 0 && gameBoard [2][2] === 0){
        console.log('0 wins column3');
        trumpWins();
    }
    else if (gameBoard[0][2] === 1  && gameBoard[1][2] === 1 && gameBoard [2][2] === 1){
        console.log('1 wins column3');
        clintonWins();
    }
    else {
        console.log('no column winner');
    }
    resetGame();
};

var checkDiagonalWinner = function(){
    if (gameBoard[0][0] === 0  && gameBoard[1][1] === 0 && gameBoard [2][2] === 0){
        console.log('0 wins diagonal left');
        trumpWins();
    }
    else if (gameBoard[0][0] === 1 && gameBoard[1][1] === 1 && gameBoard [2][2] === 1){
        console.log('1 wins diagonal left');
        clintonWins();
    }
    else if (gameBoard[0][2] === 0 && gameBoard[1][1] === 0 && gameBoard [2][0] === 0){
        console.log('0 wins diagonal right');
        trumpWins();
    }
    else if (gameBoard[0][2] === 1 && gameBoard[1][1] === 1 && gameBoard [2][0] === 1){
        console.log('0 wins diagonal right');
        clintonWins();
    }
    else {
        console.log('no diagonal winner');
    }
    resetGame();
};

var boardSum = function(){
    var row1 = 0;
    var row2 = 0;
    var row3 = 0;
    for (var i = 0; i < gameBoard.length; i++){
        row1 += gameBoard[i][0];
        row2 += gameBoard[i][1];
        row3 += gameBoard[i][2];
    }
    var sum = (row1 + row2 + row3);
    return sum;
    console.log(sum);
};

var checkTie = function(){
    if((boardSum() === 5)){
        $('#winner-box').html("AMERICA WINS!!<br/>");
        $('#winner-box').append("<button id='reset'>PLAY AGAIN!?</button>");
    }
    resetGame();
};

// var boardSum = function(){
//     for (var i = 0; i < gameBoard.length; i++) {
//         for (var j = 0; j < gameBoard.length; j++){
//             var position =+ gameBoard[i][j];
//             console.log('this is position '+ position);
//         }
//         var position =+ gameBoard[i][j];
//         console.log('this is position '+ position);
//     }
// };
