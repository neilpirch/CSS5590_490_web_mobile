// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope) {

      $scope.moveList = [];
      $scope.possibleMoves = [];
      $scope.tileList = [];
      $scope.gridSize = 3;
      $scope.playerNum = 2;
      $scope.playerTurn = 1;
      $scope.gameOver = false;
      $scope.winner = 0;
      $scope.winString = "Everybody lost. N00bs.";

      $scope.classList = ["player1","player2","player3","player4","player5"];
      $scope.turn = $scope.classList[0];

      $scope.setSize = 3;
      $scope.setPlayers = 2;

      $scope.rows = [];

      $scope.player = ["X","O","♠","☺","♪"]; //Set players characters for up to 5 players

      $scope.generateGrid = function(){
          if(parseInt($scope.setPlayers) > $scope.player.length){
              alert("Players may not exceed: " + $scope.player.length);
              $scope.setPlayers=$scope.playerNum;
          }else if(parseInt($scope.setPlayers) <= 1 ){
              alert("There must be at least 2 players.");
              $scope.setPlayers=$scope.playerNum;
          }

          //Logic to ensure that the game grid is a positive number
          if($scope.setSize<1){
              alert("Grid cannot be smaller than 1, and even that's rigged.");
              $scope.setSize = $scope.gridSize;
          }

          $scope.gridSize = parseInt($scope.setSize); //protect game setup variables from altering during the game
          $scope.playerNum = parseInt($scope.setPlayers); //protect game setup variables from altering during the game
          $scope.playerTurn = 1;
          let size = $scope.gridSize;

          //Iterate through numbers up to the set gridSize to create a square
          for (let i = 1; i <= size; i++){
              for (let j = 1; j <= size; j++){
                  $scope.tileList.push(new Tile()); //create a new tile object and add it to the row
              }
              $scope.rows.push(new TileRow($scope.tileList)); //store the row of tiles
              $scope.tileList = []; //clear the previous row
          }
      };

      //Logic to ensure that there are at least 2 players and no more than however many player characters exist


      $scope.generateGrid(); //Initialize a game with default values;

      //Start a new game
      $scope.newGame = function(){
          $scope.clearGrid();   //clear the board
          $scope.generateGrid();    //build a new board
          $scope.gameOver=false;    //reset the win conditions
          $scope.winner = 0;
          $scope.winString = "Everybody lost. N00bs.";
      }

      //Clear the game field
      $scope.clearGrid = function(){
          $scope.rows = [];
      };

      //A box has been clicked to make a selection
      $scope.changeState = function(tile){
          //Check to make sure that the game isn't already over, and that the selection haven't already been taken
          if (!tile.set && !$scope.gameOver){
              tile.state=$scope.player[$scope.playerTurn-1]; //Update the state with the corresponding player character
              tile.set=true; //Protect the tile from being overwritten
              $scope.checkWin(); //Check the win conditions
              if(!$scope.gameOver)$scope.nextPlayer(); //If the game isn't over, advance the turn
          }
      };

      //Update the turn
      $scope.nextPlayer = function(){
          if ($scope.playerTurn===$scope.playerNum){ //Player turn cannot exceed the number of players in the game
              $scope.playerTurn=1; //Reset the turn back to 1
          }else{
              $scope.playerTurn++; //Increment the turn
          }

          $scope.turn = $scope.classList[$scope.playerTurn-1]; //set the css for changing player turns
      };

      $scope.checkWin = function(){

          //Create an array to store the row strings to convert over to column strings
          let rowResults = [];

          //Create a boolean to see if there are any available spots left;
          let movesLeft = false;

          //Iterate over each TileRow object in the rows array
          angular.forEach($scope.rows,function(row){
              let rowResult = "";


              //Iterate over each Tile object in the TileRow object
              angular.forEach(row.list,function(tile){
                  rowResult += tile.state; //Build the result string
              });

              //store the completed row string for conversion to columns later
              rowResults.push(rowResult);

              //If the first character is not blank, then check for a win condition
              if(!rowResult[0].match(/ /)){
                  //If all the characters in the string match, the game is over
                  if(rowResult.split(rowResult[0]).length-1 === $scope.gridSize){
                      $scope.setWin(rowResult[0]);
                      $scope.gameOver=true;
                  }
              }
              if(rowResult.match(/ /gi) && rowResult.match(/ /gi).length > 0){
                  movesLeft = true;
              }

          });

          //Convert the row results to column results
          for (let i = 0; i < $scope.gridSize; i++){
              let colResult = "";

              for(let j = 0; j < $scope.gridSize; j++){
                  if (rowResults[j][i]){ //Check if a value is present
                      colResult += rowResults[j][i]; //Store the ith character of the jth row to transpose
                  }else{
                      colResult+=" ";
                  }

              }

              //If the first character is not blank, then check for a win condition
              if(!colResult[0].match(/ /)){
                  //If all the characters in the string match, the game is over
                  if(colResult.split(colResult[0]).length-1 === $scope.gridSize){
                      $scope.setWin(colResult[0]);
                      $scope.gameOver=true;
                  }
              }

          }

          //Logic for checking the diagonals
          let diag1 = "";
          let diag2 = "";

          //Build the diagonal strings from the previously constructed rowResults
          for(let k = 0; k < $scope.gridSize; k++){
              let temp = " ";
              let temp2 = " ";
              if(rowResults[k][k]){ //if there is a value at this position
                  temp = rowResults[k][k];  //store it to temp
              }
              if(rowResults[k][$scope.gridSize-1-k]){ //if there is a value at this position
                  temp2 = rowResults[k][$scope.gridSize-1-k]; //store it to temp2
              }

              //Build the strings with the values saved in temp2
              diag1+=temp;
              diag2+=temp2;
          }

          //If the first character is not blank, then check for a win condition
          if(!diag1[0].match(/ /)){
              //If all the characters in the string match, the game is over
              if(diag1.split(diag1[0]).length-1 === $scope.gridSize){
                  $scope.setWin(diag1[0]);
                  $scope.gameOver=true;
              }
          }

          //If the first character is not blank, then check for a win condition
          if(!diag2[0].match(/ /)){
              //If all the characters in the string match, the game is over
              if(diag2.split(diag2[0]).length-1 === $scope.gridSize){
                  $scope.setWin(diag2[0]);
                  $scope.gameOver=true;
              }
          }

          if(!movesLeft){
              $scope.gameOver=true;
          }
      };

      $scope.setWin = function(char){
          $scope.winner = $scope.player.findIndex(x=>x===char) + 1;
          $scope.setWinString();
      };

      $scope.setWinString = function(){
          $scope.winString = "Player " + $scope.winner + " is the WINNAH WINNAH CHICKEN DINNAH!!!";
      };

    });

//Create Tile objects to track their name and their completion state
function Tile() {
    this.state = " ";
    this.set = false;
}

function TileRow(list){
    this.list = list;
}