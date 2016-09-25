var game = new Game();

var generateBoard = function() {



   for(var i = 0; i < 16; i++) {
    var val;
    if(parseInt(game.boardState[i]) == 0) {
      val = ""
    } else {
      val = Math.pow(2, game.boardState[i]);
    };
    var $current = $("#" + i.toString())
    $current.removeClass();
    var newClass = "class" + val;
    $current.addClass(newClass);
    $current.text(val);
  }
};

var checkGameOver = function() {
  game.checkForWinner();
  game.checkForLoser();
  if(game.gameState == 1) {
  $("#gameover").text("You Win!")
 }

  if(game.gameState == -1) {
  $("#gameover").text("You Lose!")
 }
}

var takeTurn = function() {
  checkGameOver();
  generateBoard();
  console.log(game.gameState);
}

$(document).ready(function() {

  generateBoard();


  Mousetrap.bind('up', function(){
    game.up();
    takeTurn();
  });
  Mousetrap.bind('down', function() {
    game.down();
    takeTurn();
  });
  Mousetrap.bind('left', function() {
    game.left();
    takeTurn();
  });
  Mousetrap.bind('right', function() {
    game.right();
    takeTurn();
  });





});

