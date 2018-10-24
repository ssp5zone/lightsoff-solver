//////////////////////////////////////////
// Binary Matrix Inverse //Really???? Think before you make something....
//////////////////////////////////////////

function binaryRowOperation(rowArr1, rowArr2) {
  for (var i = 0; i < rowArr1.length; i++)
    rowArr1[i] = rowArr1[i] ^ rowArr2[i];
}


function pivotRotate(arr, columnNum, iMatrix) {

  if (arr[columnNum][columnNum] != 0) return false;

  var temp = arr[columnNum].slice();
  if (iMatrix != null) var temp2 = iMatrix[columnNum].slice();

  for (var i = columnNum + 1; i < arr.length; i++) {
    if (arr[i][columnNum] != 0) {
      arr[columnNum] = arr[i].slice();
      arr[i] = temp.slice();

      if (iMatrix != null) {
        iMatrix[columnNum] = iMatrix[i].slice();
        iMatrix[i] = temp2.slice();
      }

      return true;
    }
  }
}

function binaryMatrixInverse(arr) {
  var iMatrix = generateIdentity(arr.length);

  for (i = 0; i < arr.length; i++) {
    pivotRotate(arr, i, iMatrix);

    var loopAgain = true;
    do {
      //Gauss-Elimination (Or whatever it is called..)
      for (j = 0; j < i; j++) {
        if (arr[i][j] === 1) {
          binaryRowOperation(arr[i], arr[j]);
          binaryRowOperation(iMatrix[i], iMatrix[j]);
        }
      }

      loopAgain = pivotRotate(arr, i, iMatrix);

    } while (loopAgain);
  }

  for (i = 0; i < arr.length - 1; i++) {
    //Gauss-Elimination (Or whatever it is called..)
    for (j = i + 1; j < arr.length; j++) {
      if (arr[i][j] === 1) {
        binaryRowOperation(arr[i], arr[j]);
        binaryRowOperation(iMatrix[i], iMatrix[j]);
      }
    }
  }
  return iMatrix;
}

//////////////////////////////////////////
// Binary Matrix Multiply
//////////////////////////////////////////

function binaryMultiplyMatrix(mat1, mat2) {
  var product = new Array(mat1.length);
  for (var m = 0; m < product.length; m++)
    product[m] = new Array(mat2[m].length).fill(0);

  for (var i = 0; i < mat2[0].length; i++) {
    for (var j = 0; j < mat2.length; j++) {
      for (var k = 0; k < mat1[i].length; k++)
        product[j][i] ^= (mat1[j][k] * mat2[k][i])
    }
  }
  return product;
}
/////////////////////
// Generate N Pattern (Can be Improved)
/////////////////////

function generateNPattern(n) {
  N = n * n;
  var arr = new Array(N);
  for (k = 0; k < N; k++) {
    kElem = k % n;
    kLine = Math.trunc(k / n);
    arr[k] = new Array();
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        arr[k].push(((i == kLine && j == kElem) || (i - 1 == kLine && j == kElem) || (i + 1 == kLine && j == kElem) || (i == kLine && j - 1 == kElem) || (i == kLine && j + 1 == kElem)) ? 1 : 0);
      }
    }
  }
  return arr;
}

/////////////////////
// Generate Identity Matrix
////////////////////


function generateIdentity(n) {
  var arr = new Array(n);
  for (i = 0; i < n; i++) {
    arr[i] = new Array(n).fill(0);
    arr[i][i] = 1;
  }
  return arr;
}


//////////////////////////////////////////////////////
// display
//////////////////////////////////////////////////////

var customStyle = "<style>\
    .hint::after{\
    content: ''; width: 20%; height: 20%; display: block; background: yellowgreen; margin: auto; border-radius: 50%; top: 40%; position: relative;\
    }\
</style>";

$(customStyle).appendTo("head");

$('body').css({
  "width": "300px",
  "margin": "20px auto"
});
$('body').html('<div id="GameConatiner"></div>');
$('#GameConatiner').height('300px').css({
  'background': '#313131',
  'margin': '20px auto'
});

var gameArray, playMode = false;
newGrid(3); //default

var buttonStyle = "display: block; width: 100%; padding: 4px; margin: 10px 0; font-size: 1.2em;";

$('body').append('<input type="button" id="mode" value="Edit Mode"/>');
$('body').append('<input type="button" id="solveGame" value="Solve"/>');
$('body').append('<select>\
  <option value="3">3x3</option>\
  <option value="4">4x4</option>\
  <option value="5">5x5</option>\
  <option value="6">6x6</option>\
  <option value="7">7x7</option>\
  <option value="8">8x8</option>\
  <option value="9">9x9</option>\
</select>');
$('body').append('<input type="button" id="generate" value="Generate"/>');
$('body').append('<input type="button" id="refresh" value="Refresh"/>');

$('input').attr('style', buttonStyle);
$('select').attr('style', buttonStyle);

$('select').change(function (e, opt) {
  newGrid(Number($(this).val()));
});


$('#solveGame').click(function () {
  window.solution = binaryMultiplyMatrix(solverMatrix, gameArray);
  renderSolution(solution);
});

$("#mode").click(function() {
  playMode = !playMode;
  $(this).val(playMode ? 'Play Mode' : 'Edit Mode')
});

$("#generate").click(function() {
  var k=0;
  for (var i = 0; i < gameSize; i++) {
    for (var j = 0; j < gameSize; j++) {
      var rand = 0|Math.random()*2;
      gameArray[k++] = [rand];
      cell = getElement(i,j);
      cell.css('background', rand ? 'yellow' : '');
      cell.removeClass('hint');
    }
  }
  if(!playMode)
    $("#mode").trigger("click");
});

function renderSolution(solution) {
  for (var i = 0; i < solution.length; i++) {
    rowNum = Math.trunc(i / gameSize);
    columnNum = i - (gameSize * rowNum);
    getElement(rowNum, columnNum).toggleClass('hint', !!solution[i][0]);
  }
  if(!playMode)
    $("#mode").trigger("click");
}

function createGrid(gameSize) {

  window.gameArray = new Array(gameSize);
  var k = 0;

  $('#GameConatiner').html('');

  var w = $('#GameConatiner').width() / gameSize;
  var h = $('#GameConatiner').height() / gameSize;
  
  for (var i = 0; i < gameSize; i++) {
    for (var j = 0; j < gameSize; j++) {
      $('#GameConatiner').append('<div row="' + i + '" column="' + j + '" style="width:' + (w - 2.5) + 'px; height:' + (h - 2.5) + 'px;float:left;border: 1px solid coral; cursor: pointer;"></div>');
      gameArray[k++] = [0];
    }
  }



  $('div[row][column]').click(function() {
    var row = Number($(this).attr('row')),
      column = Number($(this).attr('column'));
    
    toggle(row, column);

    if(playMode) {
      toggle(row, column-1);
      toggle(row, column+1);
      toggle(row-1, column);
      toggle(row+1, column);
    }

    getElement(row, column).removeClass('hint');
  });


}

function toggle(row, column) {
  
  if (row < 0 || row >= gameSize || column < 0 || column >= gameSize)
    return;

  var cell = getElement(row, column);
  var status = gameArray[(row * gameSize) + column][0];

  cell.css('background', status ? '' : 'yellow');
  gameArray[(row * gameSize) + column][0] = !status * 1;
}

function getElement(row, column) {
  return $(`div[row=${row}][column=${column}]`);
}

$('#refresh').click(function () {
  createGrid(gameSize);
});

function newGrid(gridSize) {
  window.gameSize = Number(gridSize);
  createGrid(gameSize);
  window.solverMatrix = binaryMatrixInverse(generateNPattern(gameSize));
}