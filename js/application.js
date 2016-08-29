var game;

$(document).ready(function() {
  game = new Game();
  console.log(game.toString());


  Mousetrap.bind('up', game.up.bind(game));
  Mousetrap.bind('down', game.down.bind(game));
  Mousetrap.bind('left', game.left.bind(game));
  Mousetrap.bind('right', game.right.bind(game));


});

