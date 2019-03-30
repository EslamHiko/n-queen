var board = [];
var triesCount = 0;
var N = 0;

function fillNBoard(N){
  removeBoard();
  var html = '';
  for(var i = 0; i < N; i++){
    html += '<tr>';
    for(var j = 0; j < N; j++){
      html += boardPlace(i,j);
    }
    html += '</tr>';
  }

  $('tbody').html(html);
  addEventListeners();
}

function cleanBoard(){
  $('[col]').prop('checked',false).removeProp('checked');
  for(i = 0; i < N; i++)
    for(j = 0;j<N;j++){
      board[i][j] = 0;
    }
}

function removeBoard(){
  $('tbody').html('');
}

function readBoard(){
  var count = 0;
  $('[col]').each(function(index, el) {
    if($(this).is(':checked')){
      board[$(this).attr('col')][$(this).attr('row')] = 1;
      count++;
    } else {
      board[$(this).attr('col')][$(this).attr('row')] = 0;
    }
  });
  return count;
}

function addEventListeners(){
  $('[col]').not('listening').attr('listening',true).on('change', function(event) {
    /* Act on the event */
    if($(this).is(':checked')){
      count = readBoard();
      if(count > N){
        $(this).prop('checked',false).removeProp('checked');
        alert('You have to place only '+N+' Queens');
      }
  }
  });
}

function boardPlace(y,x){
  return `<th><input type="checkbox" col="${y}" row="${x}" class="form-control"></th>`
}

function inDanger(y,x){
  //check the right side
  for(i = x-1;i >= 0; i--){
    if(board[y][i])
      return [y,i];
  }
  // check the left side
  for(i = x+1;i < N; i++){
    if(board[y][i])
      return [y,i];
  }
  // check up
  for(i = y-1;i >= 0; i--){
    if(board[i][x])
      return [i,x];
  }
  // check down
  for(i = y+1;i < N; i++){
    if(board[i][x])
      return [i,x];
  }
  // check diagonal up right
  for(i = y-1,j=x+1;i >= 0 && j<N; i--,j++){
    if(board[i][j])
      return [i,j];
  }
  // check diagonal up  left
  for(i = y-1,j=x-1;j >= 0 && i>=0; i--,j--){
    if(board[i][j])
      return [i,j];
  }
  // check diagonal down left
  for(i = y+1,j=x-1;i < N && j>=0; i++,j--){
    if(board[i][j])
      return [i,j];
  }
  // check diagonal down right
  for(i = y+1,j=x+1;j < N && i<N; i++,j++){
    if(board[i][j])
      return [i,j];
  }
  return false;
}
function checkBoard(){
  readBoard();
  var nCounter = 0;

  // looping over the board
  for(var i = 0; i < N; i++){
    for(var j = 0; j < N; j++){
      if(board[i][j]){
        nCounter++;
        victim = inDanger(i,j);
        if(victim){
           return alert(`Queen At (${i},${j}) Can Attack Queen At (${victim[0]},${victim[1]})`);
         }
      }
    }
  }
  if(nCounter == N){
    return alert("You Won !");
  } else {
    return alert("You Didn't Place N Queens.");
  }
}

function isSafe(newBoard, row, col){

  // Checks the ← direction
  for(var i=0; i<col; i++){
    if (newBoard[row][i] === 1) {
      return false;
    }
  }

  // Checks the ↖ direction
  for(var i=row, j=col; i>=0 && j>=0; i--, j--){
    if (newBoard[i][j] === 1) {
      return false;
    }
  }

  // Checks the ↙ direction
  for(var i=row, j=col; j>=0 && i<N; i++, j--){
    if (newBoard[i][j] === 1){
      return false;
    }
  }

  return true;
}

function solve(){
  cleanBoard();
  newBoard = board;
  solved = solveBoard(newBoard,0);
  console.log(solved);
  if(solved){
    drawBoard(solved);
    alert('N Queens Placed Successfully !');
  }
  else {
    alert('N Queens Can\'t be placed');
  }
}
function solveBoard(newBoard,col = 0)
{
    /* base case: If all queens are placed
      then return true */
      console.log(col,N);
      console.log(col >= N, col == N);
      solutions = [];
    if (col == N){
      console.log(newBoard);
        return newBoard;
      }


    /* Consider this column and try placing
       this queen in all rows one by one */
    for (var i = 0; i < N; i++)
    {
        /* Check if the queen can be placed on
          board[i][col] */
        if ( isSafe(newBoard,i, col) )
        {

            /* Place this queen in board[i][col] */
            newBoard[i][col] = 1;
            console.log(newBoard);
            // solveBoard(newBoard,col + 1);
            // if(firstBoard){
            //   return firstBoard;
            // }
            /* recur to place rest of the queens */
            if ( solveBoard(newBoard,col + 1) )
                return newBoard;

            /* If placing queen in board[i][col]
               doesn't lead to a solution, then
               remove queen from board[i][col] */
            newBoard[i][col] = 0; // BACKTRACK
        }
    }

     /* If the queen cannot be placed in any row in
        this colum col  then return false */
    return false;
}

function drawBoard(newBoard){
  for(i = 0; i < N; i++)
    for(j = 0;j<N;j++){
      if(newBoard[i][j]){
        board[i][j] = 1;
        $(`[col=${i}][row=${j}]`).prop('checked',true);
      } else {
        board[i][j] = 0;
      }
    }
}

$(document).ready(function() {
  $('#n-btn').on('click', function(event) {
    N = parseInt($('#n').val());
    fillNBoard(N);
    board = [];
    for(i = 0; i < N; i++)
      board.push([]);
  });
});
