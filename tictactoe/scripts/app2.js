console.log('linked!');

// var boxA = $('#boxA');
// $(boxA).click(function(){
//     console.log('boxA clicked');
// });
//
// var boxB = $('#boxB');
// $(boxB).click(function(){
//     console.log('boxB clicked');
// });
//
// var boxC = $('#boxC');
// $(boxC).click(function(){
//     console.log('boxC clicked');
// });
//
// var boxD = $('#boxD');
// $(boxD).click(function(){
//     console.log('boxD clicked');
// });
//
// var boxE = $('#boxE');
// $(boxE).click(function(){
//     console.log('boxE clicked');
// });
//
// var boxF = $('#boxF');
// $(boxF).click(function(){
//     console.log('boxF clicked');
// });
//
// var boxG = $('#boxG');
// $(boxG).click(function(){
//     console.log('boxG clicked');
// });
//
// var boxH = $('#boxH');
// $(boxH).click(function(){
//     console.log('boxH clicked');
// });
//
// var boxI = $('#boxI');
// $(boxI).click(function(){
//     console.log('boxI clicked');
// });
//
//
// var clinton = 'clinton'; // turn 0
// var trump = 'trump'; // turn 1
// var turn = 0;
//
// // var newGame = function() {
// //     $('.boxes').click(function(){
// //         for (turn = 0; turn <= 9; turn++){
// //             if (turn%2=== 0){
// //                 console.log('player 1');
// //
// //         }
// //             else {
// //                 console.log('player 2')
// //             }
// //         }
// //     })
// // };
//
//
// var boardCheck = function() {
//
// };
//
// var checkWin = function(){
//
//     if ((row[0] === boxB && boxA === boxC && (boxA === clinton)) || // row 1
//         (boxD === boxE && boxD === boxF && (boxA === clinton)) || // row 2
//         (boxG === boxH && boxG === boxI && (boxA === clinton)) || // row 3
//         (boxA === boxD && boxA === boxG && (boxA === clinton)) || // column 1
//         (boxB === boxE && boxB === boxH && (boxA === clinton)) || // column 2
//         (boxC === boxF && boxC === boxI && (boxA === clinton)) || // column 3
//         (boxA === boxE && boxA === boxI && (boxA === clinton)) || // left down diagonal
//         (boxC === boxE && boxC === boxG && (boxA === clinton)) // right down diagonal
//
//     ) {
//         var winClinton = true;
//         console.log('CLINTON WINS!');
//     }
//     else if ((boxA === boxB && boxA === boxC && (boxA === trump)) || // row 1
//         (boxD === boxE && boxD === boxF && (boxA === trump)) || // row 2
//         (boxG === boxH && boxG === boxI && (boxA === trump)) || // row 3
//         (boxA === boxD && boxA === boxG && (boxA === trump)) || // column 1
//         (boxB === boxE && boxB === boxH && (boxA === trump)) || // column 2
//         (boxC === boxF && boxC === boxI && (boxA === trump)) || // column 3
//         (boxA === boxE && boxA === boxI && (boxA === trump)) || // left down diagonal
//         (boxC === boxE && boxC === boxG && (boxA === trump)) // right down diagonal
//     ){
//         var winTrump = true;
//         console.log('TRUMP WINS :(');
//     }
// };
//
// var checkTie = function(){
//     if (winClinton === false || winTrump === false){
//         console.log('TIE');
//     }
// };

var currentPlayer = 0;

var row1 = [null,null,1]; // [null, 1, 1]
var row2 = [null,1,null]; // [0,0,0]
var row3 = [1,null,null]; // [null, null, 1]

var placeholder = '';

var assignWinner = function(){
    if(checkForWinner() === 0){
        alert('trump wins!');
    }
    else if (checkForWinner() === 1){
        alert('clinton wins!');
    }
    else {
        alert('tie!');
    }
};


var checkRowWinner= function(){
    if (row1[0] != null && row1[1] != null && row1[2] != null) { // row 1 check
        console.log('row 1 check hit');
        if (row1[0] === 0 && row1[1] === 0 && row1[2] === 0) {
            console.log('0 wins');
            return 0;

        }
        else if (row1[0] === 1 && row1[1] === 1 && row1[2] === 1) {
            console.log('1 wins');
            return 1;
        }
    }
    else if (row2[0] != null && row2[1] != null && row1[2] != null) { // row 2 check
        console.log('row 2 check hit');
        if (row2[0] === 0 && row2[1] === 0 && row2[2] === 0){
            console.log('0 wins');
            return 0;
        }
        else if (row2[0] === 1 && row2[1] === 1 && row2[2] === 1) {
            console.log('1 wins');
            return 1;
        }
    }
    else if (row3[0] != null && row3[1] != null && row3[2] != null) { // row 3 check
        console.log('row 3 check hit');
        if (row3[0] === 0 && row3[1] === 0 && row3[2] === 0){
            console.log('0 wins');
            return 0;
        }
        else if (row3[0] === 1 && row3[1] === 1 && row3[2] === 1) {
            console.log('1 wins');
            return 1;
        }
    }
    else {
        console.log('no check row winner');
    }
};

var checkColumnWinner = function () {
    if (row1[0] != null && row2[0] != null && row3[0] != null) { // column 1 check
        console.log('column 1 check hit');
        if (row1[0] === 0 && row2[0] === 0 && row3[0] === 0){
            console.log('0 wins');
            return 0;
        }
        else if (row1[0] === 1 && row2[0] === 1 && row3[0] === 1) {
            console.log('1 wins');
            return 1;
        }

    }
    else if (row1[1] != null && row2[1] != null && row3[1] != null) { // column 2 check
        console.log('column 2 check hit')
        if (row1[1] === 0 && row2[1] === 0 && row3[1] === 0){
            console.log('0 wins');
            return 0;
        }
        else if (row1[1] === 1 && row2[1] === 1 && row3[1] === 1) {
            console.log('1 wins');
            return 1;
        }

    }
    else if (row1[2] != null && row2[2] != null && row3[2] != null) { // column 3 check
        console.log('column 3 check hit')
        if (row1[2] === 0 && row2[2] === 0 && row3[2] === 0){
            console.log('0 wins');
            return 0;
        }
        else if (row1[2] === 1 && row2[2] === 1 && row3[2] === 1) {
            console.log('1 wins');
            return 1;
        }

    }
    else {
        console.log('no check column winner');
    }
};

var checkDiagonalWinner = function () {
    if (row1[0] != null && row2[1] != null && row3[2] != null) { // diagonal left check
        if (row1[0] === 0 && row2[1] === 0 && row3[2] === 0){
            console.log('0 wins');
            return 0;
        }
        else if (row1[0] === 1 && row2[1] === 1 && row3[2] === 1) {
            console.log('1 wins');
            return 1;
        }

    }
    else if (row1[2] != null && row2[1] != null && row3[0] != null) { // diagonal right check
        if (row1[2] === 0 && row2[1] === 0 && row3[0] === 0){
            console.log('0 wins');
            return 0;
        }
        else if (row1[2] === 1 && row2[1] === 1 && row3[0] === 1) {
            console.log('1 wins');
            return 1;
        }
    }
    else {
        console.log('no check diagonal winner');
    }
};

// var checkForWinner = function() {
//     // horizontal rows x3
//     if (row1[0] != null && row1[1] != null && row1[2] != null) { // row 1 check
//         console.log('row 1 check hit');
//         if (row1[0] === 0 && row1[1] === 0 && row1[2] === 0){
//             return 0;
//
//         }
//         else if (row1[0] === 1 && row1[1] === 1 && row1[2] === 1) {
//             return 1;
//         }
//         else {
//             console.log("else 1 hit")
//         }
//     }
//     else if (row2[0] != null && row2[1] != null && row1[2] != null) { // row 2 check
//         console.log('row 2 check hit');
//         if (row2[0] === 0 && row2[1] === 0 && row2[2] === 0){
//             return 0;
//         }
//         else if (row2[0] === 1 && row2[1] === 1 && row2[2] === 1) {
//             return 1;
//         }
//
//     }
//     else if (row3[0] != null && row3[1] != null && row3[2] != null) { // row 3 check
//         console.log('row 1 check hit');
//         if (row3[0] === 0 && row3[1] === 0 && row3[2] === 0){
//             return 0;
//         }
//         else if (row3[0] === 1 && row3[1] === 1 && row3[2] === 1) {
//             return 1;
//         }
//
//     }
//     else if (row1[0] != null && row2[0] != null && row3[0] != null) { // column 1 check
//         console.log('column check hit');
//         if (row1[0] === 0 && row2[0] === 0 && row3[0] === 0){
//             return 0;
//         }
//         else if (row1[0] === 1 && row2[0] === 1 && row3[0] === 1) {
//             return 1;
//         }
//
//     }
//     else if (row1[1] != null && row2[1] != null && row3[1] != null) { // column 2 check
//         console.log('column 2 check hit')
//         if (row1[1] === 0 && row2[1] === 0 && row3[1] === 0){
//             return 0;
//         }
//         else if (row1[1] === 1 && row2[1] === 1 && row3[1] === 1) {
//             return 1;
//         }
//
//     }
//     else if (row1[2] != null && row2[2] != null && row3[2] != null) { // column 3 check
//         console.log('column 3 check hit')
//         if (row1[2] === 0 && row2[2] === 0 && row3[2] === 0){
//             return 0;
//         }
//         else if (row1[2] === 1 && row2[2] === 1 && row3[2] === 1) {
//             return 1;
//         }
//
//     }
//     else if (row1[0] != null && row2[1] != null && row3[2] != null) { // diagonal left check
//         if (row1[0] === 0 && row2[1] === 0 && row3[2] === 0){
//             return 0;
//         }
//         else if (row1[0] === 1 && row2[1] === 1 && row3[2] === 1) {
//             return 1;
//         }
//
//     }
//     else if (row1[2] != null && row2[1] != null && row3[0] != null) { // diagonal right check
//         if (row1[2] === 0 && row2[1] === 0 && row3[0] === 0){
//             return 0;
//         }
//         else if (row1[2] === 1 && row2[1] === 1 && row3[0] === 1) {
//             return 1;
//         }
//     }
//     else {
//         console.log('end hit');
//     }
// };
//
// checkForWinner();
