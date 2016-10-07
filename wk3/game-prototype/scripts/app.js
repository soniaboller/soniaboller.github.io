// timer hits zero end level
// if time hits zero and score is below x number you lose
// if timer hits zero and score is above number or move on
// before game starts show color to compare darker or lighter -- maybe keep this at the top of the screen? or somewhere in the screen?
// as the game progresses make the color range smaller so it gets harder

// create a div to append boxes to rather than the body -- multiple divs to allow for horizontal sliding??

// maybe do purple and other mixed colors if time permits?

$(document).ready(function(){
    console.log("linked");
});

// jQuery selectors
    // try to declare selector variables??

// GLOBAL VARIABLES
var colorButtonChoice = '';
var score = 0;
var time = 25;


// GAMEPLAY FUNCTIONS
function addScore(){
    score += 1;
    $('#score-div').html('SCORE : ' + score);
}

function subtractScore(){
    score -= 3;
    $('#score-div').html('SCORE : ' + score);
}

function rgbToArray(colorToConvert){
    var colorArray = [];
    var color = colorToConvert.substring(3).replace('(', '').replace(')', ''); // cuts off the rgb part of color tag
    colorArray.push(color.split(', ')); // removes the commas and pushes into color array
    console.log('this is the color array '+ colorArray);
    return colorArray;
}


// ON CLICK FUNCTIONS
$('#start').on('click', function(){
    createBoard();
    var timer = setInterval(countDown,1000); // counts down seconds

    function countDown(){
        time--;
        if(time == 0){
            clearInterval(timer);
        }
        $('#time-div').html('time remaining : '+ time);
    }
    $('#start').fadeOut(500, function(){
        // start button fades out
    });
    $('.container').css('display', 'none');
    $('.box').fadeIn(1200, 'swing', function(){
        // boxes fading in at start
    });
    $('.box').on('click', function(){
        var id = this.id; // id of box clicked
        var nextBox = $('#'+id).next();
        var previousBox = $('#'+id).prev();
        var clickedColor = $('#'+id).css('backgroundColor'); // stores rgb value of clicked color
        var nextBoxColor = nextBox.css('backgroundColor'); // stores rgb value of next color
        var previousBoxColor = previousBox.css('backgroundColor'); // stores rgb value of previous color
        var clickedColorArray = rgbToArray(clickedColor); // creates array for clicked color
        var nextBoxColorArray = rgbToArray(nextBoxColor); // creates array for next color
        var previousBoxColorArray = rgbToArray(previousBoxColor); // creates array for previous color
        console.log('this is the clicked box id '+ id); // clicked box ID
        console.log('this is the next box id '+ nextBox[0].id); // next box ID
        console.log('this is the previous box id '+ previousBox[0].id); // previous box ID
        console.log('this is the clicked color '+ clickedColor); // rgb of clicked color
        console.log('this is the next box color '+ nextBoxColor); // rgb of next color
        console.log('this is the previous box color '+ previousBoxColor); // rgb of prev color
        console.log('clicked box color array '+ clickedColorArray); //rgb array of clicked color
        console.log('next box color array '+ nextBoxColorArray); //rgb array of next color
        console.log('previous box color array '+ previousBoxColorArray); //rgb array of prev color
        if(colorButtonChoice === 'blue'){
            var clickedBlue = parseInt(clickedColorArray[0][2]);
            var nextBlue = parseInt(nextBoxColorArray[0][2]);
            var previousBlue = parseInt(previousBoxColorArray[0][2]);

            console.log('clicked '+ clickedBlue); // blue value of clicked color array
            console.log('next '+ nextBlue); // blue value of next color array
            console.log('prev '+ previousBlue); // blue value of prev color array

            if(clickedBlue < nextBlue && clickedBlue < previousBlue){
                $('#'+id).text('darker');
                console.log('darker (blue)');
                addScore();
            }
            else {
                $('#'+id).text('lighter');
                console.log('lighter (blue)');
                subtractScore();
            }
        }
        else if (colorButtonChoice === 'green'){
            var clickedGreen = parseInt(clickedColorArray[0][1]);
            var nextGreen = parseInt(nextBoxColorArray[0][1]);
            var previousGreen = parseInt(previousBoxColorArray[0][1]);

            console.log('clicked '+ clickedGreen); // green value of clicked color array
            console.log('next '+ nextGreen); // green value of next color array
            console.log('prev '+ previousGreen); // green value of prev color array

            if(clickedGreen < nextGreen && clickedGreen < previousGreen){
                $('#'+id).text('darker');
                console.log('darker (green)');
                addScore();
            }
            else {
                $('#'+id).text('lighter');
                console.log('lighter (green)');
                subtractScore();
            }
        }
        else if (colorButtonChoice === 'red'){
            var clickedRed = parseInt(clickedColorArray[0][0]);
            var nextRed = parseInt(nextBoxColorArray[0][0]);
            var previousRed = parseInt(previousBoxColorArray[0][0]);

            console.log('clicked '+ clickedRed); // red value of clicked color array
            console.log('next '+ nextRed); // red value of next color array
            console.log('prev '+ previousRed); // red value of prev color array

            if(clickedRed < nextRed && clickedRed < previousRed){
                $('#'+id).text('darker');
                console.log('darker (red)');
                addScore();
            }
            else {
                $('#'+id).text('lighter');
                console.log('lighter (red)');
                subtractScore();
            }
        }
        else {
            console.log('you probably tried to add the purple button back in and there is no if else statement for that yet');
        }
        $('#'+id).fadeOut(500, function(){
            this.remove();
            // boxes fading out on click
        })
    });
});

$('.color-button').on('click', function(){
    var colorId = this.id;
    if (colorId === 'blue'){
        colorButtonChoice = 'blue';
        console.log('blue works!');
    }
    else if (colorId === 'red'){
        colorButtonChoice =  'red';
        console.log('red works!');
    }
    else if (colorId === 'purple'){
        colorButtonChoice =  'purple';
        console.log('purple works!');
    }
    else if (colorId === 'teal'){
        colorButtonChoice =  'teal';
        console.log('teal works!');
    }
    else {
        colorButtonChoice =  'green';
        console.log('green works!')
    }
    $('.color-button').fadeOut(500, function(){}); // color buttons fade out
    $('#start').delay(500).fadeIn(500, function(){}); // start button fades in
    console.log(colorButtonChoice);
    return colorButtonChoice;
});

// THIS CAN FOR SURE BE SHORTENED AND REFACTORED
var createBoard = function(){
    $('body').prepend('<header>');
    $('body').prepend('<div id="score-div"></div>');
    $('body').prepend('<div id="time-div"></div>');
    $('#score-div').text('SCORE : ' + score);
    $('#time-div').text('time remaining : ' + time);
    for (var i = 1; i <= 100; i++) {
        var $newdiv = $('<div class="box"/>');
        if (colorButtonChoice === "blue"){
            var colorBlue = randomRGBBlue();
            $('body').append($newdiv);
            $($newdiv).css('background-color',colorBlue);
            $($newdiv).prop('id',i);
        }
        else if (colorButtonChoice === "red"){
            var colorRed = randomRGBRed();
            $('body').append($newdiv);
            $($newdiv).css('background-color',colorRed);
            $($newdiv).prop('id',i);
        }
        else if (colorButtonChoice === "purple"){
            var colorPurple = randomRGBPurple();
            $('body').append($newdiv);
            $($newdiv).css('background-color',colorPurple);
            $($newdiv).prop('id',i);
        }
        else if (colorButtonChoice === "teal"){
            var colorTeal = randomRGBTeal();
            $('body').append($newdiv);
            $($newdiv).css('background-color',colorTeal);
            $($newdiv).prop('id',i);
        }
        else{
            var colorGreen = randomRGBGreen();
            $('body').append($newdiv);
            $($newdiv).css('background-color',colorGreen);
            $($newdiv).prop('id',i);
        }
    }
};

$('body').keydown(function(e){
    console.log(e.which);
    if(e.which === 27){
        location.reload();
        console.log('refresh');
    }
});


// set interval to keep creating colors but hide overflow?
// check if rgb([i]) is within a range -- ie a specific color?


// VARIOUS COLOR GENERATORS
function randomRGBNumber() {
    return Math.round((Math.random() * 210) + 46);
}

// mid range number to keep colors less dark
function randomMid(){
    return Math.round((Math.random() * 150) + 106);
}

function randomRGBBlue(){
    return 'rgb(' + 0 + ', ' + 0 + ', ' + randomRGBNumber() + ')';
}

function randomRGBRed(){
    return 'rgb(' + randomRGBNumber() + ', ' + 0 + ', ' + 0 + ')';
}

function randomRGBGreen(){
    return 'rgb(' + 0 + ', ' + randomRGBNumber() + ', ' + 0 + ')';
}

function randomRGBPurple(){
    return 'rgb(' + randomMid() + ', ' + 0 + ', ' + randomMid() + ')';
}

function randomRGBTeal(){
    return 'rgb(' + 0 + ', ' + randomMid() + ', ' + randomMid() + ')';
}

function randomRGBColor() {
    return 'rgb(' + randomRGBNumber() + ', ' + randomRGBNumber() + ', ' + randomRGBNumber() + ')';
}

function hexRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var colorArray = ['red', 'green', 'blue', 'pink'];
pickRandomArrayColor = function(){
    for(var i = 0; i < colorArray.length; i++){
        var color = [];
        color.push(colorArray[Math.round(Math.random() * colorArray.length)]);
        console.log(color);
    }
};
// d3.select("body").append("p").text("New paragraph!");
// var dataset = [ 5, 10, 15, 20, 25 ];
// d3.select("body").selectAll("p").data(dataset).enter().append("p").text("New paragraph!");