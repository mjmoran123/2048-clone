var stringify = function(array) {
  var string = "";
    for(var j = 0; j < 4; j++) {
      for(var k = 0; k < 4; k++) {
        string += array[j][k];
      }
    }
    return string;
}

var arrayify = function(string) {
  var array = [];
  array[0] = [];
  array[1] = [];
  array[2] = [];
  array[3] = [];

  for(var i = 0; i < 16; i++) {
      array[Math.floor(i / 4)][i % 4] = parseInt(string.charAt(i));
  }
  return array;
}



var Game = function(gameString) {

  var initBoard = function() {

    //Generates random board positions
    var rand1,rand2;

    while (rand1 == rand2) {
      rand1 = _.random(15);
      rand2 = _.random(15);
    }

    //Generates random seed integers to insert into board
    var seed1  = _.random(1,2);
    var seed2  = _.random(1,2);

    //Generates blank board 2d array structure
    boardArray = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

    boardArray[Math.floor(rand1 / 4)][rand1 % 4] = seed1;
    boardArray[Math.floor(rand2 / 4)][rand2 % 4] = seed2;

    //Converts 2d array into string
     return stringify(boardArray);
  }
  //Takes in initial board state or generates random board state
  this.boardState = gameString || initBoard();
  this.gameState = 0; //gameState value of 0 = in progress, 1 = won, -1 = loss
};

Game.prototype.toString = function() {
  return this.boardState.substring(0,4) + "\n" + this.boardState.substring(4,8) + "\n" + this.boardState.substring(8,12) + "\n" + this.boardState.substring(12,16)
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
    // console.log(array);
  }
  return array
};

Game.prototype.up = function() {
  var checkingState = this.boardState;
  var currentBoard = arrayify(this.boardState);
  var col0 = [];
  var col1 = [];
  var col2 = [];
  var col3 = [];
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      if(j == 0) {
        col0.push(currentBoard[i][j]);
      } else if(j == 1) {
        col1.push(currentBoard[i][j]);
      }else if (j == 2) {
        col2.push(currentBoard[i][j]);
      } else if( j == 3) {
        col3.push(currentBoard[i][j]);
      }
    }
  }
  col0 = this.smash(col0);
  col1 = this.smash(col1);
  col2 = this.smash(col2);
  col3 = this.smash(col3);
  newBoardArray = [];

  newBoardArray[0] = [col0[0], col1[0], col2[0], col3[0]];
  newBoardArray[1] = [col0[1], col1[1], col2[1], col3[1]];
  newBoardArray[2] = [col0[2], col1[2], col2[2], col3[2]];
  newBoardArray[3] = [col0[3], col1[3], col2[3], col3[3]];
  var intState = stringify(newBoardArray);
  if(checkingState != intState) {
    var randI = _.random(3);
    var randJ = _.random(3);

    while(stringify(currentBoard).indexOf('0') != -1 && newBoardArray[randI][randJ] != 0) {
      randI = _.random(3);
      randJ = _.random(3);
    }

    newBoardArray[randI][randJ] = _.random(1,2);}

  this.boardState = stringify(newBoardArray);
};

Game.prototype.down = function() {
  var checkingState = this.boardState;
  var currentBoard = arrayify(this.boardState);
  var col0 = [];
  var col1 = [];
  var col2 = [];
  var col3 = [];
  for(var i = 3; i > -1; i--) {
    for(var j = 0; j < 4; j++) {
      if(j == 0) {
        col0.push(currentBoard[i][j]);
      } else if(j == 1) {
        col1.push(currentBoard[i][j]);
      }else if (j == 2) {
        col2.push(currentBoard[i][j]);
      } else if( j == 3) {
        col3.push(currentBoard[i][j]);
      }
    }
  }
  col0 = this.smash(col0);
  col1 = this.smash(col1);
  col2 = this.smash(col2);
  col3 = this.smash(col3);
  newBoardArray = [];

  newBoardArray[0] = [col0[3], col1[3], col2[3], col3[3]];
  newBoardArray[1] = [col0[2], col1[2], col2[2], col3[2]];
  newBoardArray[2] = [col0[1], col1[1], col2[1], col3[1]];
  newBoardArray[3] = [col0[0], col1[0], col2[0], col3[0]];

  var intState = stringify(newBoardArray);

  if(checkingState != intState) {
    var randI = _.random(3);
    var randJ = _.random(3);

    while(stringify(currentBoard).indexOf('0') != -1 && newBoardArray[randI][randJ] != 0) {
      randI = _.random(3);
      randJ = _.random(3);
    }

    newBoardArray[randI][randJ] = _.random(1,2);}

  this.boardState = stringify(newBoardArray);
};

Game.prototype.left = function(array) {
  var checkingState = this.boardState;
  var currentBoard = arrayify(this.boardState);

  currentBoard[0] = this.smash(currentBoard[0]);
  currentBoard[1] = this.smash(currentBoard[1]);
  currentBoard[2] = this.smash(currentBoard[2]);
  currentBoard[3] = this.smash(currentBoard[3]);
  var intState = stringify(currentBoard);
  if(checkingState != intState) {
    var randI = _.random(3);
    var randJ = _.random(3);

    while(stringify(currentBoard).indexOf('0') != -1 && currentBoard[randI][randJ] != 0) {
      randI = _.random(3);
      randJ = _.random(3);
    }

    currentBoard[randI][randJ] = _.random(1,2);}

  this.boardState = stringify(currentBoard);
};

Game.prototype.right = function(array) {
  var checkingState = this.boardState;
  var currentBoard = arrayify(this.boardState);
  currentBoard[0] = this.smash(currentBoard[0].reverse()).reverse();
  currentBoard[1] = this.smash(currentBoard[1].reverse()).reverse();
  currentBoard[2] = this.smash(currentBoard[2].reverse()).reverse();
  currentBoard[3] = this.smash(currentBoard[3].reverse()).reverse();

  var intState = stringify(currentBoard);
  if(checkingState != intState) {
    var randI = _.random(3);
    var randJ = _.random(3);

    while(stringify(currentBoard).indexOf('0') != -1 && currentBoard[randI][randJ] != 0) {
      randI = _.random(3);
      randJ = _.random(3);
    }

    currentBoard[randI][randJ] = _.random(1,2);}

  this.boardState = stringify(currentBoard);
};

Game.prototype.checkForWinner = function() {
   if(this.boardState.indexOf('8') != -1) {
    this.gameState = 1;
   };
}

Game.prototype.checkForLoser = function() {
  if(this.boardState.indexOf('0') == -1) {
    var upCheck = new Game(this.boardState);
    var downCheck = new Game(this.boardState);
    var leftCheck = new Game(this.boardState);
    var rightCheck = new Game(this.boardState);
    upCheck.up();
    downCheck.down();
    leftCheck.left();
    rightCheck.right();

     if(upCheck.boardState == this.boardState  && downCheck.boardState == this.boardState && leftCheck.boardState == this.boardState && rightCheck.boardState == this.boardState) {
      this.gameState = -1;
     }

  }
}




// var newGame = new Game();
// console.log(newGame.toString());
// console.log(newGame.right());
// console.log(newGame.toString());
