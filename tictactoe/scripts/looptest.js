var gameBoard = [[0, 1, 0],
                 [0, 1, 0],
                 [0, 1, 0]];

// multi-dimensional array loop
// var rows = gameBoard.length;
// var cols = gameBoard.length;

for (var i = 0; i < gameBoard.length; i++) {
    for (var j = 0; j < gameBoard.length; j++){
    // var rows = gameBoard[i];
        // console.log(rows);
        // var position = gameBoard[i][j];
        var columns = (gameBoard[j][i]);
        console.log("columns" + columns);
        if (gameBoard[i] === [1,1,1] || gameBoard[i] === [0,0,0]) {
            console.log("winner");
        }
        // else if (gameBoard[i][0])
        // console.log("position is " + position);
    }
}
    // loop through rows
    var row = gameBoard[i];
    console.log(row);
    // now, loop through each column
//     for (var j = 0; j < cols; j++) {
//         // now we go through each column
//         var column = cols[j];
//         console.log(column);
//         // do your thang
//     }
// }


function markSpot(box,player) {
    switch(box) {
        case "BoxA":
            gameBoard[0][0] = player;//1
            break;
        case "BoxB":
            gameBoard[0][1] = player;//1
            break;
        case "BoxC":
            gameBoard[0][2] = player;//1
            break;
        case "BoxD":
            gameBoard[1][0] = player;//1
            break;
        case "BoxE":
            gameBoard[1][1] = player;//1
            break;
        case "BoxF":
            gameBoard[1][2] = player;//1
            break;
        case "BoxG":
            gameBoard[2][0] = player;//1
            break;
    }
}



// game play does not work but working on it
var gamePlay = function (){
    $('.boxes').on('click', function(event) {
        var boxEl = this;
        console.log(boxEl);
        if(turn % 2 === 0){
            $(boxEl).append(trumpImage);
            var input = "trump"; // just to keep track of who is who in console.log -- we can remove this later
            console.log(input);
            // function based on which id this is
            var id = $(boxEl).prop('id');
            console.log(id);
            // to do this
            gameBoard[0][0] = 0;
            console.log("box A is " + gameBoard[0][0]);
        }
        else {
            $(boxEl).append(hillaryImage);
            var input = "clinton"; // just to keep track of who is who in console.log -- we can remove this later
            console.log(input);
            gameBoard[0][0] = 1;
            console.log("box A is " + gameBoard[0][0]);
        }
        turn++;
        checkWinner();
    });