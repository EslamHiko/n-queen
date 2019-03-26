var board = [][];
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
}

function removeBoard(){
  $('tbody').html('');
}

function readBoard(){
  var count = 0;
  $('[col]').each(function(index, el) {
    if($(this).is(':checked'))
      board[$(this).attr('col')][$(this).attr('row')] = 1;
  });
  count++;
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

function checkBoard(){

}

function solveBoard(N){

}
