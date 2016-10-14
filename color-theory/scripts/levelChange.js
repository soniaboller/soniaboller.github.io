var game = game || {};
game.nextLevel = nextLevel;
game.delayResetBoard = delayResetBoard;
game.delayClearBoard = delayClearBoard;
game.delayDisplayLevel = delayDisplayLevel;
game.checkGameLevel = checkGameLevel;
game.numberReset = numberReset;
game.saveScore = saveScore;
game.scoresArray = [];
game.animationSpeed = 1500;

var boardTimeoutId;
var levelTimeoutId;

// delays displaying level so fadeout of board can occur
function delayDisplayLevel() {
    boardTimeoutId = setTimeout(displayLevel, 1000);
    function displayLevel(){
        $('p').text(' LEVEL : ' + game.level);
        $('#next-level').velocity("fadeIn", { duration: 1000 });
        $('#next-level').velocity("fadeOut", { delay: 3000, duration: 1000 });
    }
}

// delays complete removal of board so fadeout can occur
function delayClearBoard() {
    boardTimeoutId = setTimeout(clearBoard, 750);
    function clearBoard(){
        $('.rows').remove();
        $('header').remove();
    }
}

// delays board reset so level number can be displayed
function delayResetBoard() {
    boardTimeoutId = setTimeout(resetBoard, 5250);
    function resetBoard(){
        game.newBox = 13;
        game.time = 21;
        game.createBoard();
        clearTimeout(levelTimeoutId);
        timeCount();
    }
}

function nextLevel(){
    game.randomColorMultiplier -= 50;
    game.randomColorAdder += 50;
    game.shiftIntervalCounter = 1;
    game.numberReset();
    game.delayClearBoard();
    game.delayDisplayLevel();
    game.delayResetBoard();
}

function checkGameLevel (){
    if (game.level < 4){
        $('.rows').addClass('levelOne');
    }
    else if (game.level >= 4 && game.level < 7){
        $('.rows').removeClass('levelOne').addClass('levelTwo');
        game.animationSpeed = 1250;
    }
    else if (game.level >= 7){
        $('.rows').removeClass('levelTwo').addClass('levelThree');
        game.animationSpeed = 1000;
    }
}

// resets game number variable as levels progress
function numberReset(){
    if (game.level === 4){
        game.rowNumber = 3;
        game.randomColorMultiplier = 150;
        game.randomColorAdder = 106;
    }
    else if (game.level === 7){
        game.rowNumber = 4;
        game.randomColorMultiplier = 150;
        game.randomColorAdder = 106;
    }
}

function saveScore(){
    game.scoresArray.push(game.score);
    console.log(game.score);
    console.log(game.scoresArray);
}
