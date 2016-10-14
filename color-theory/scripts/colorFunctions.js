var game = game || {};
game.randomColorMultiplier = 150;
game.randomColorAdder = 106;

// takes RGB color value from box and converts it from a string to a an array that can be used to compare color values
function rgbToArray(colorToConvert){
    var colorArray = [];
    var color = colorToConvert.substring(3).replace('(', '').replace(')', ''); // removes the rgb and parenthesis of color tag
    colorArray.push(color.split(', ')); // removes the commas and pushes into color array
    return colorArray;
}

function randomRGBNumber() {
    return Math.floor((Math.random() * game.randomColorMultiplier) + game.randomColorAdder);
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
