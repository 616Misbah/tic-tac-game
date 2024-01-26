let array=[
    `<div style="display:flex">
        <button class="a1 row-a col-1 dia1" onclick="tic('a1');"></button>
        <button class="a2 row-a col-2" onclick="tic('a2')"></button>
        <button class="a3 row-a col-3 dia2" onclick="tic('a3')"></button>
    </div>`,
    `<div style="display:flex">
        <button class="b1 row-b col-1" onclick="tic('b1')"></button>
        <button class="b2 row-b col-2 dia1 dia2" onclick="tic('b2')"></button>
        <button class="b3 row-b col-3" onclick="tic('b3')"></button>
    </div>`,
    `<div style="display:flex">
        <button class="c1 row-c col-1 dia2" onclick="tic('c1')"></button>
        <button class="c2 row-c col-2" onclick="tic('c2')"></button>
        <button class="c3 row-c col-3 dia1" onclick="tic('c3')"></button>
    </div>`
];
array.forEach(value=>document.querySelector('.game-board').innerHTML+=value)
console.log(document.querySelector('.a1').innerHTML==='')
let xTurn=true;
let canPlay=true;
let tic = str =>{
    if(canPlay){
        let buttonElem=document.querySelector(`.${str}`).innerHTML;
        if(buttonElem===''){
            if(xTurn){
                document.querySelector(`.${str}`)
                    .innerHTML='X';
                xTurn=false;
            }
            else{
                document.querySelector(`.${str}`)
                    .innerHTML='O';
                xTurn=true;
            }
        }
        checkBoard();
    }
}
function checkBoard(){
    check('row-a');
    check('row-b');
    check('row-c');
    check('col-1');
    check('col-2');
    check('col-3');
    check('dia1');
    check('dia2');
    checkWin();
}
let xWin=false;
let oWin=false;
let winnerSquare;
function check(str){
    if(
        document.querySelectorAll(`.${str}`)[0].innerHTML === document.querySelectorAll(`.${str}`)[1].innerHTML &&
        document.querySelectorAll(`.${str}`)[1].innerHTML === document.querySelectorAll(`.${str}`)[2].innerHTML)
    {
        if(document.querySelectorAll(`.${str}`)[0].innerHTML==='X'){
            xWin=true;
            document.querySelectorAll(`.${str}`).forEach(value=>value.classList.add('winnerGrid'));
            winnerSquare=str;
        }
        else if(document.querySelectorAll(`.${str}`)[0].innerHTML==='O'){
            oWin=true;
            document.querySelectorAll(`.${str}`).forEach(value=>value.classList.add('winnerGrid'));
            winnerSquare=str;
        }
    }
}
function checkWin(){
    if(xWin===true){
        canPlay=false;
        document.querySelector('.result').innerHTML='X WIN';
        document.querySelector('.restart').innerHTML=`<button class="newGame" onclick="resetBoard();">New Game</button>`;
    }
    if(oWin===true){
        canPlay=false;
        document.querySelector('.result').innerHTML='O WIN';
        document.querySelector('.restart').innerHTML=`<button class="newGame" onclick="resetBoard();">New Game</button>`;
    }
    checkDraw();
}
function checkDraw(){
    let boardFill=true;
    document.querySelectorAll('button').forEach(value=>{
        if(value.innerHTML===''){
            boardFill=false;
        }
    });
    if(boardFill && !xWin && !oWin){
        canPlay=false;
        document.querySelector('.result').innerHTML='DRAW';
        document.querySelector('.restart').innerHTML=`<button class="newGame" onclick="resetBoard();">New Game</button>`;
    }
}
function resetBoard(){
    document.querySelector('.restart').innerHTML='';
    document.querySelectorAll('button').forEach(value=>value.innerHTML='');
    document.querySelector('.result').innerHTML='';
    document.querySelectorAll(`.${winnerSquare}`).forEach(value=>value.classList.remove('winnerGrid'));
    xWin=false;
    oWin=false;
    boardFill=true;
    xTurn=true;
    canPlay=true;
}