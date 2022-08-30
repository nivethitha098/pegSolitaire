const boxes = document.querySelectorAll('.box');
const marbleLeftDisplay = document.querySelector('.marbles-left');
let marblesLeft = 32;

let selectedPiece = {
    pieceId : 0,
    movable: false,
    cannotMoveDown : false, //3,4,5,10,11,12
    cannotMoveUp : false, //38,39,40,45,46,47
    cannotMoveRight : false, //15,22,29,16,23,30
    cannotMoveLeft : false, //20,27,34,21,28,35
    seventhSpace : false, //move down marble
    fouteenthSpace : false, //move down empty
    firstSpace : false, //move right marble
    secondSpace : false, //move right empty
    minusSeventhSpace : false, //move up marble
    minusFouteenthSpace : false, //move up empty
    minusFirstSpace : false, //move left marble
    minusSecondSpace : false //move left empty
}

givePiecesEventListener();
function givePiecesEventListener(e) {
    for (let i = 0; i < boxes.length; i++) {
        if(boxes[i].classList.contains('marble')){
            boxes[i].addEventListener('click', resetPieces);
        }
    }
}

function resetPieces (e) {
    for (let i = 0; i < boxes.length; i++){
        boxes[i].classList.remove('selected-piece');
        boxes[i].classList.remove('highlight');
    }
    resetSelectedPieceProperties();
    removeCellOnClick();
    getSelectedPiece(e);
}

function resetSelectedPieceProperties () {
    selectedPiece.pieceId = 0,
    selectedPiece.movable = false,
    selectedPiece.cannotMoveDown = false, //22,23,27,28,29,30,34,35,38,39,40,45,46,47
    selectedPiece.cannotMoveUp = false, //22,23,27,28,15,16,20,21,10,11,12,3,4,5
    selectedPiece.cannotMoveRight = false, //4,5,11,12,20,21,27,28,34,35,39,40,46,47
    selectedPiece.cannotMoveLeft = false, //3,4,10,11,38,39,45,46,15,16,22,23,29,30
    selectedPiece.seventhSpace = false, //move down marble
    selectedPiece.fouteenthSpace = false, //move down empty
    selectedPiece.firstSpace = false, //move right marble
    selectedPiece.secondSpace = false, //move right empty
    selectedPiece.minusSeventhSpace = false, //move up marble
    selectedPiece.minusFouteenthSpace = false, //move up empty
    selectedPiece.minusFirstSpace = false, //move left marble
    selectedPiece.minusSecondSpace = false //move left empty
}

function removeCellOnClick () {
    for (let i = 0; i < boxes.length; i++){
        boxes[i].removeAttribute('onClick');
    }
}

function getSelectedPiece(e) {
    selectedPiece.pieceId = parseInt(e.target.id);
    getCannotMoveDirections();
}


function getCannotMoveDirections () {
    let n = selectedPiece.pieceId;
    //cannot move down
    if (n == 22 || n == 23 || n == 27 || n == 28 || n == 29 ||n == 30 || n == 34 || n == 35 || n == 38 || n == 39 || n == 40 || n == 45 || n == 46 || n == 47){
        selectedPiece.cannotMoveDown = true;
    }
    //cannot move up
    if (n == 22 || n == 23 || n == 27 || n == 28 || n == 15 ||n == 16 || n == 20 || n == 21 || n == 10 || n == 11 || n == 12 || n == 3 || n == 4 || n == 5){
        selectedPiece.cannotMoveUp = true;
    }
    //cannot move right
    if (n == 4 || n == 5 || n == 11 || n == 12 || n == 20 ||n == 21 || n == 27 || n == 28 || n == 34 || n == 35 || n == 39 || n == 40 || n == 46 || n == 47){
        selectedPiece.cannotMoveRight = true;
    }
    //cannot move left
    if (n == 3 || n == 4 || n == 10 || n == 11 || n == 38 ||n == 39 || n == 45 || n == 46 || n == 15 || n == 16 || n == 22 || n == 23 || n == 29 || n == 30){
        selectedPiece.cannotMoveLeft = true;
    }
    getMarbleSpaces();
}

function getMarbleSpaces () {
    let n = selectedPiece.pieceId;
    //move down marble
    if (!selectedPiece.cannotMoveDown && document.getElementById(n + 7).classList.contains('marble')) {
        selectedPiece.seventhSpace = true;
    }
    //move up marble
    if (!selectedPiece.cannotMoveUp && document.getElementById(n - 7).classList.contains('marble')) {
        selectedPiece.minusSeventhSpace = true;
    }
    //move right marble
    if (!selectedPiece.cannotMoveRight && document.getElementById(n + 1).classList.contains('marble')) {
        selectedPiece.firstSpace = true;
    }
    //move left marble
    if (!selectedPiece.cannotMoveLeft && document.getElementById(n - 1).classList.contains('marble')) {
        selectedPiece.minusFirstSpace = true;
    }
    getJumpSpaces()
}

function getJumpSpaces () {
    let n = selectedPiece.pieceId;
    //move down empty
    if (selectedPiece.seventhSpace && document.getElementById(n + 14).classList.contains('empty')) {
        selectedPiece.fouteenthSpace = true;
        selectedPiece.movable = true;
    }
    //move up empty
    if (selectedPiece.minusSeventhSpace && document.getElementById(n - 14).classList.contains('empty')){
        selectedPiece.movable = true;
        selectedPiece.minusFouteenthSpace = true;
    }
    //move right empty
    if (selectedPiece.firstSpace && document.getElementById(n + 2).classList.contains('empty')) {
        selectedPiece.movable = true;
        selectedPiece.secondSpace = true;
    }
    //move left empty
    if (selectedPiece.minusFirstSpace && document.getElementById(n - 2).classList.contains('empty')) {
        selectedPiece.movable = true;
        selectedPiece.minusSecondSpace = true;
    }
    givePieceBorder();
}

function givePieceBorder () {
    let n = selectedPiece.pieceId;
    //selected-piece hightlight
    if ((selectedPiece.fouteenthSpace || selectedPiece.minusFouteenthSpace ||selectedPiece.secondSpace ||selectedPiece.minusSecondSpace) && document.getElementById(n).classList.contains('marble')){
        document.getElementById(n).classList.add('selected-piece');
        if(selectedPiece.fouteenthSpace) {
            document.getElementById(n + 14).classList.add('highlight');
        }
        if(selectedPiece.minusFouteenthSpace) {
            document.getElementById(n - 14).classList.add('highlight');
        }
        if(selectedPiece.secondSpace) {
            document.getElementById(n + 2).classList.add('highlight');
        }
        if(selectedPiece.minusSecondSpace) {
            document.getElementById(n - 2).classList.add('highlight');
        }
    }
    giveCellsClick();
}

function giveCellsClick () {
    let n = selectedPiece.pieceId
    if(selectedPiece.fouteenthSpace){
        document.getElementById(n + 14).setAttribute('onclick', 'makeMove(14)')
    }
    if(selectedPiece.minusFouteenthSpace){
        document.getElementById(n - 14).setAttribute('onclick', 'makeMove(-14)')
    }
    if(selectedPiece.secondSpace){
        document.getElementById(n + 2).setAttribute('onclick', 'makeMove(2)')
    }
    if(selectedPiece.minusSecondSpace){
        document.getElementById(n - 2).setAttribute('onclick', 'makeMove(-2)')
    }
}

function makeMove (number) {
    let n = selectedPiece.pieceId;
    document.getElementById(n).classList.remove('marble', 'selected-piece');
    document.getElementById(n).classList.add('empty');
    marblesLeft--
    marbleLeftDisplay.innerHTML = marblesLeft;
    if(number == 14) {
        document.getElementById(n + 7).classList.remove('marble');
        document.getElementById(n + 7).classList.add('empty');
        document.getElementById(n + 14).classList.remove('empty', 'highlight');
        document.getElementById(n + 14).classList.add('marble');
    }
    if(number == -14) {
        document.getElementById(n - 7).classList.remove('marble');
        document.getElementById(n - 7).classList.add('empty');
        document.getElementById(n - 14).classList.remove('empty', 'highlight');
        document.getElementById(n - 14).classList.add('marble');
    }
    if(number == 2) {
        document.getElementById(n + 1).classList.remove('marble');
        document.getElementById(n + 1).classList.add('empty');
        document.getElementById(n + 2).classList.remove('empty', 'highlight');
        document.getElementById(n + 2).classList.add('marble');
    }
    if(number == -2) {
        document.getElementById(n - 1).classList.remove('marble');
        document.getElementById(n - 1).classList.add('empty');
        document.getElementById(n - 2).classList.remove('empty', 'highlight');
        document.getElementById(n - 2).classList.add('marble');
    }
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('highlight');
    }

    resetSelectedPieceProperties();
    removeCellOnClick();
    removeEventListeners()
}
  

function removeEventListeners() {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].removeEventListener('click', resetPieces)
    }
    givePiecesEventListener()
}






