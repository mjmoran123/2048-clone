var Game = function(gameString) {

  var initBoard = function() {

    //Generates random board positions
    var rand1,rand2;

    while (rand1 == rand2) {
      rand1 = Math.floor(Math.random() * 16);
      rand2 = Math.floor(Math.random() * 16);
    }

    //Generates random seed integers to insert into board
    var seed1  = Math.floor(Math.random() * 2 + 1);
    var seed2  = Math.floor(Math.random() * 2 + 1);

    //Generates blank board 2d array structure
    boardArray = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

    boardArray[Math.floor(rand1 / 4)][rand1 % 4] = seed1;
    boardArray[Math.floor(rand2 / 4)][rand2 % 4] = seed2;

    //Converts 2d array into string
    var boardString = "";
    for(var j = 0; j < 4; j++) {
      for(var k = 0; k < 4; k++) {
        boardString += boardArray[j][k];
      }
    }
    return boardString;
  }
  //Takes in initial board state or generates random board state
  this.gameState = gameString || initBoard();
};

Game.prototype.toString = function() {
  return this.gameState.substring(0,4) + "\n" + this.gameState.substring(4,8) + "\n" + this.gameState.substring(8,12) + "\n" + this.gameState.substring(12,16)
};

Game.prototype.collapse = function(array) {
  var collapsedArr = _.without(array, 0);

  while(collapsedArr.length < 4) {
    collapsedArr.push(0);
  }
  return collapsedArr;
};

Game.prototype.smash = function(array) {
  array = this.collapse(array);

  for(var i=0; i < 3; i++) {
    if(array[i] == array[i + 1] && array[i] != 0) {
      array[i] += 1;
      array[i+1] = 0;
      array = this.collapse(array);
    } else {
      array = this.collapse(array);
    }
    console.log(array);
  }
  return array
};



var newGame = new Game();
console.log(newGame.gameState);
console.log(newGame.smash([0,2,4,3]));
