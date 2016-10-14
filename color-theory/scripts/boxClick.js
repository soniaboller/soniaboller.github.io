var game = game || {};
game.boxClick = boxClick;
game.newBox = 13;

function boxClick(){
    game.id = this.id;
    var rowValue = $(this).parent().prop('id');
    var gameIdSelector = $('#' + game.id);
    var nextBox = $(gameIdSelector).next();
    var previousBox = $(gameIdSelector).prev();
    var clickedColorArray = rgbToArray($(gameIdSelector).css('backgroundColor'));
    var nextBoxColorArray = rgbToArray(nextBox.css('backgroundColor'));
    var previousBoxColorArray = rgbToArray(previousBox.css('backgroundColor'));
        if(game.colorButtonChoice === 'blue'){
            var i = 2;
        }
        else if(game.colorButtonChoice === 'green'){
            var i = 1;
        }
        else if(game.colorButtonChoice === 'red'){
            var i = 0;
        }
    game.clickedColor = parseInt(clickedColorArray[0][i]);
    game.nextColor = parseInt(nextBoxColorArray[0][i]);
    game.previousColor = parseInt(previousBoxColorArray[0][i]);
    compareColors();
    $(gameIdSelector).fadeOut(500, function(){
        this.remove();
        setBackgroundColors();
        var rowToAppendTo = rowValue.split('');
        var newDiv = $('<div class="box"/>');
        $('#'+ rowValue).append(newDiv);
        $(newDiv).css('background-color', game.colorRandomFunction);
        $(newDiv).css('display', 'inline');
        $(newDiv).prop('id', rowToAppendTo[4] + '-' + game.newBox);
        $(newDiv).on('click', game.boxClick);
        game.newBox++;
    });
}

function compareColors() {
    if(game.clickedColor < game.nextColor && game.clickedColor < game.previousColor){
        $('#'+ game.id).text('darker +1');
        game.addScore();
    }
    else {
        $('#'+ game.id).text('lighter -1');
        game.subtractScore();
    }
}
