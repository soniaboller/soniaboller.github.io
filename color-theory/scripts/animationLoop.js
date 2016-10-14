// slow down time for when there are less rows

var game = game || {};
game.removeFirstRowBox = removeFirstRowBox;
game.createBox = createBox;

var j = 1, countUp = true;

var timeoutId;

function removeFirstRowBox(){
    timeoutId = setTimeout(function(){
        if (countUp){
            game.createBox();
            game.removeFirstRowBox();
            j++;
            if (j >= game.rowNumber){
                countUp = false;
            }
        }
        else {
            game.createBox();
            game.removeFirstRowBox();
            j--;
            if (j <= 1){
                countUp = true
            }
        }
    }, game.animationSpeed);
    game.newBox++;
}

function createBox(){
    var rowSelected = $('.box:first-child');
    $(rowSelected[j-1]).remove();
    setBackgroundColors();
    var newDiv = $('<div class="box"/>');
    $('#row-' + j).append(newDiv);
    $(newDiv).css('background-color', game.colorRandomFunction);
    $(newDiv).css('display', 'inline');
    $(newDiv).prop('id', j + '-' + game.newBox);
    $(newDiv).on('click', game.boxClick);
}
