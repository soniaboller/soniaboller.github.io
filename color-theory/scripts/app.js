$(document).ready(function(){
    console.log("linked");
});

var game = game || {};
game.score = 0;
game.time = 21;
game.level = 1;
game.colorButtonChoice = '';
game.rowNumber = 2;
game.addScore = addScore;
game.subtractScore = subtractScore;
game.generateBoard = generateBoard;
game.timeCount = timeCount;
game.createRows = createRows;
game.createBoard = createBoard;
game.delayGameOverReload = delayGameOverReload;
game.pause = false;
var timer;
var reloadTimeoutId;
var startButton = $('#start');
var instructions = $('#instructions');
var bodyWrapper = $('#body-wrap');


// GAMEPLAY FUNCTIONS

function addScore(){
    game.score += 1;
    $('#score-div').html('SCORE : ' + game.score);
}

function subtractScore(){
    game.score -= 1;
    $('#score-div').html('SCORE : ' + game.score);
}

// tracks time
function timeCount(){
    timer = setInterval(countDown,1000); // counts down seconds
    function countDown(){
        game.time--;
        if(game.time === 0 && game.level < 9){
            clearTimeout(boardTimeoutId);
            $('.box').velocity('fadeOut', { duration: 1000 });
            $('header').velocity('fadeOut', { duration: 1000 });
            game.saveScore();
            console.log('finishing level: '+ game.level);
            game.level +=1;
            console.log('starting level: '+ game.level);
            game.nextLevel();
            clearTimeout(timeoutId);
            clearInterval(timer);
        }
        else if (game.time === 0 && game.level >= 9){
            game.gameOver();
            return
        }
        $('#time-div').html('time remaining : '+ game.time);
    }
}

// creates the rows that the boxes populate
function createRows() {
    game.numberReset();
    for (var i = 1; i <= game.rowNumber; i++) {
        var newRow = $('<div>');
        $('#page-wrap').append(newRow);
        $(newRow).prop('id', 'row-' + i).addClass('rows');
    }
    game.checkGameLevel();
}

// generates the board, but is hidden with css
function generateBoard() {
    game.createRows();
    for (var j = 1; j <= game.rowNumber; j++) {
        for (var i = 1; i <= 12; i++) {
            setBackgroundColors();
            var newDiv = $('<div class="box"/>');
            $('#row-' + j).append(newDiv);
            $(newDiv).css('background-color', game.colorRandomFunction);
            $(newDiv).prop('id', j + '-' + i);
        }
    }
}

// appends the board to the DOM
function createBoard(){
    generateBoard();
    $('#page-wrap').prepend('<header>');
    $('header').prepend('<span id="score-div"></span>', '<span id="time-div"></span>');
    $('#score-div').text('SCORE : ' + game.score);
    $('#time-div').text('time remaining : ' + game.time);
    $('header').velocity('fadeIn', { delay: 750, duration: 1000 });
    $('span').velocity('fadeIn', { delay: 750, duration: 1000 });
    $('.rows').velocity('fadeIn', { delay: 750, duration: 1000 });
    $('.box').on('click', game.boxClick);
    game.removeFirstRowBox();
}

// checks which color button was selected and determines further functions accordingly
function setBackgroundColors() {
    if (game.colorButtonChoice === "blue"){
        game.colorRandomFunction = randomRGBBlue();
        game.instructionsColor = 'rgba(0,0,255,0.3)';
    }
    else if (game.colorButtonChoice === "red"){
        game.colorRandomFunction = randomRGBRed();
        game.instructionsColor = 'rgba(255,0,0,0.3)';
    }
    else if (game.colorButtonChoice === "green"){
        game.colorRandomFunction = randomRGBGreen();
        game.instructionsColor = 'rgba(0,255,0,0.3)';
    }
}

// delays reload after esc key is pressed after scoreboard is displayed
function delayGameOverReload(){
    reloadTimeoutId = setTimeout(function(){
        location.reload()
    }, 750);
}


// KEYDOWN FUNCTIONS

$('body').keydown(function(e){
    var bodyClass = $(bodyWrapper).prop('class');
    if(e.which === 27 && bodyClass === 'gameOverDialogue' && game.level >= 9){
        $(bodyWrapper).removeClass('gameOverDialogue');
        game.delayGameOverReload();
    }
    else if (e.which === 13 && bodyClass === 'gameOverDialogue'){
        game.getName();
        $('h6').text('SCORE : ' + game.totalScore);
        $('#name-input').velocity({ opacity: 0 }, { visibility: 'hidden' });
    }
    else if (e.which === 80){
        if (!game.pause && game.time > 0){
            clearInterval(timer);
            clearTimeout(timeoutId);
            game.pause = true;
            $(bodyWrapper).addClass('gameOverDialogue');
        }
        else if (game.pause &&game.time > 0){
            $(bodyWrapper).removeClass('gameOverDialogue');
            timeCount();
            game.removeFirstRowBox();
            game.pause = false;
        }
    }
});


// ON CLICK FUNCTIONS

$(startButton).on('click', function(){
    $(this).velocity('fadeOut', { duration: 650 });
    $('.container').velocity('fadeOut', {duration: 650 });
    createBoard();
    timeCount();
});

$(startButton).on('mouseover', function(){
    setBackgroundColors();
    $(instructions).velocity('fadeIn', { duration: 500 });
    $(instructions).css('backgroundColor', game.instructionsColor);
});

$(startButton).on('mouseout', function(){
    $(instructions).velocity('fadeOut', { duration: 500 });
});

$('.color-button').on('click', function(){
    game.colorButtonChoice = this.id;
    $('.color-button').velocity('fadeOut', { duration: 500 });
    $(startButton).velocity('fadeIn', { delay: 500, duration: 500 });
    return game.colorButtonChoice;
});
