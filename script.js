const placeShips = document.querySelector('.placeShips');
const submit = document.querySelector('.submit');

let opponent = 0;
let pOneBoard = [];
let pTwoBoard = [];
let playerTurn = 0;

//First, create two arrays representing the players boards
function createBoardArray(array) {
    for(let i = 0; i<10; i++){
        array.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
}

createBoardArray(pOneBoard);
createBoardArray(pTwoBoard);

let gridNum = 0;

function createBoard(parentDiv, el, elType) {
    //create div which contains the grid
    let div = document.createElement('div');
    parentDiv.appendChild(div);
    div.setAttribute('id', `grid${gridNum}`);
    div.classList.add(`grid`);

    //create cells for battleship grid
    if (elType === 'checkbox') {
        for(let i = 0; i<10; i++){
            for(let x = 0; x<10; x++){
                let container = document.createElement('label');
                let cell = document.createElement(el);
                let span = document.createElement('span');
                div.appendChild(container);
                container.classList.add('cellContainer');
    
                container.appendChild(cell);
                cell.classList.add(`cell`);
                cell.setAttribute('type', elType)
                cell.setAttribute('id', `checkbox${i}-${x}`)
    
                container.appendChild(span);
                span.setAttribute('id', `span${i}-${x}`)
                span.classList.add('checkbox');               
            }
        }
    } else {
        for(let i = 0; i<10; i++){
            for(let x = 0; x<10; x++){
                let cell = document.createElement(el);
                div.appendChild(cell);
                cell.classList.add(`cell`);
                cell.setAttribute('type', elType)
                cell.setAttribute('id', `cell${i}-${x}`)
            }
        }

    }
    gridNum++;
}

createBoard(placeShips, 'input', 'checkbox')

class ship {
    constructor(name, cells, startCell, direction, cellsUsed) {
        this.name = name;
        this.cells = cells;
        this.startCell = startCell;
        this.direction = direction;
        this.cellsUsed = cellsUsed;
    }
}

let startCells;
let index1;
let index2;
let newindex1;
let newindex2;
let ships = [];

function whichShip(index1, index2, x) {
    //make function which gives specific number to ship type
    switch (ships[x].name){
        case 'destroyer':
            pTwoBoard[index1][index2] = 2;
            break;
        case 'submarine':
            pTwoBoard[index1][index2] = 4;
            break;
        case 'cruiser':
            pTwoBoard[index1][index2] = 6;
            break;
        case 'battleship':
            pTwoBoard[index1][index2] = 8;
            break;
        case 'carrier':
            pTwoBoard[index1][index2] = 10;
            break;
        default:
            console.log('problem with adding ship')
    }
}

function generateShips() {
    startCells = [...Array(5)].map(x => Math.floor(Math.random() * 100).toString());
    let directions = [...Array(5)].map(x => Math.floor(Math.random() * 2));
    
    ships.push(new ship('destroyer', 2, startCells[0], directions[0], {}));
    ships.push(new ship('submarine', 3, startCells[1], directions[1], {}));
    ships.push(new ship('cruiser', 3, startCells[2], directions[2], {}));
    ships.push(new ship('battleship', 4, startCells[3], directions[3], {}));
    ships.push(new ship('carrier', 5, startCells[4], directions[4], {}));

    let usedCells = [];

    
    for(let x = 0; x < ships.length; x++){//iterate through ship array
        let currentCells = [];

        for(let i = 0; i< 100; i++){//iterate through cells
            if (ships[x].startCell == i){
                console.log('Placing ', ships[x].name)
                function shipIndices(){//get correct starting cell
                    
                    console.log(ships[x].startCell)
                    if(ships[x].startCell.length === 2){//if the starting cell is two digits long
                        index1 = Number(ships[x].startCell[0]);
                        index2 = Number(ships[x].startCell[1])
                    } else { //if the starting cell is one digit long
                        index1 = 0;
                        index2 = Number(ships[x].startCell[0])
                    }
                    //checkCollision(index1, index2, x)
                    
                    newindex1 = index1;
                    newindex2 = index2;
                    usedCells.push([index1, index2]);

                    whichShip(index1, index2, x)

                    if (ships[x].direction === 0) {//horizontal
                        console.log('hozzy')
                        if (Number(index2)+Number(ships[x].cells) >= 10){
                            for(let z = 0; z < Number(ships[x].cells); z++){
                                //checkCollision(index1, newindex2, x);
                                console.log(index1, newindex2)

                                whichShip(index1, newindex2, x)
                                usedCells.push([index1, index2]);
                                newindex2--

                            }
                            checkCollision(index1, newindex2, x, ships[x].cells)
                        } else {
                            for(let z = 0; z < Number(ships[x].cells); z++){
                                //checkCollision(index1, newindex2, x);
                                console.log(index1, newindex2)

                                whichShip(index1, newindex2, x)
                                usedCells.push([index1, newindex2]);
                                newindex2++;

                            }
                            checkCollision(index1, newindex2, x, ships[x].cells)

                        }
                    } else { //vertical
                        console.log('vertizzy')
                        if (Number(index1)+Number(ships[x].cells) >= 10){
                            for(let z = 0; z < Number(ships[x].cells); z++){

                               // checkCollision(newindex1, index2, x);
                                console.log(newindex1, index2)

                                whichShip(newindex1, index2, x)
                                usedCells.push([newindex1, index2]);
                                newindex1--

                            }
                            checkCollision(newindex1, index2, x, ships[x].cells)

                        } else {
                            for(let z = 0; z < Number(ships[x].cells); z++){

                                //checkCollision(newindex1, index2, x);
                                console.log(newindex1, index2)

                                whichShip(newindex1, index2, x)
                                usedCells.push([newindex1, index2]);
                                newindex1++;                            

                            }
                            checkCollision(newindex1, index2, x, ships[x].cells)

                        }
                    }
                }
                shipIndices();
                console.log(usedCells)

                function checkCollision(index1, index2, ship, lengthOfShip){
                    //let usedCellsStringified = JSON.stringify(usedCells)
                    //REPAIR THIS, IT DOESN'T DETECT DUPLICATES
                    let duplicates = usedCells.filter((val, index) => index !== usedCells.indexOf(val));
                    console.log(duplicates)
                    if(duplicates ==''){
                        console.log(usedCells)
                        console.log('no duplicates found');
                        
                    } else {
                        let length = usedCells.length;
                        console.log(length)
                        console.log(lengthOfShip)

                        let newLength = length - lengthOfShip;
                        usedCells.length = newLength;

                    }
                    /*console.log('checking collision')
                    //let currentCells = [];
                    //currentCells.push(index1, index2);
                    console.log('these are the current cells', currentCells)
                    
                    let usedCellsStringified = JSON.stringify(usedCells)
                    currentCells = JSON.stringify(currentCells);
                    let indexOfArr = usedCellsStringified.indexOf(currentCells);
                    console.log('this is current index -',indexOfArr)

                    if(indexOfArr != -1){
                        console.log('COLLISION!')
                        ships[ship].startCell = Math.floor(Math.random() * 100).toString();
                        //ships[ship].direction = Math.floor(Math.random() * 2);
                        shipIndices();
                    } else {
                        usedCells.push(currentCells);
                        for (let z = 0; z < ships.length; z++){
                            for(let y = 0; y < ships[x].cells; y++){

                            }
                        }
                        whichShip(index1, index2, x)
                    }
                    console.log(usedCells)*/

                }
                
                
            }
        }

        console.log('ships added ',x+1)

    }
    console.log(pTwoBoard);

}

function addShips() {
    let currentGrid = document.querySelector(`.grid`);

    if(playerTurn === 0){
        for(let i = 0; i<10; i++){
            for(let x = 0; x<10; x++){
                if(document.querySelector(`#grid${gridNum-1} #checkbox${i}-${x}`).checked === true){
                    pOneBoard[i][x] = 2;
                }
                
            }
        }
    } else {//row-col
        
        if (opponent === 0){ //opponent is computer
            generateShips();
        } else { //opponent is player 2
            for(let i = 0; i<10; i++){
                for(let x = 0; x<10; x++){
                    if(document.querySelector(`#grid${gridNum-1} #checkbox${i}-${x}`).checked === true){
                        pTwoBoard[i][x] = 2;
                    }
                    
                }
            }
            console.log(pTwoBoard)
    
        }
        

    }
    

    if(playerTurn===0){
        playerTurn++;
        if(opponent === 0) { //if against comp, skip add ship screen
            addShips()
        } else {
            addShipsTwo();
        }
    } else if (playerTurn === 1){
        submit.removeEventListener('click', addShips);
        submit.addEventListener('click', shoot)
        playerTurn = 0;
        changeTurn(); 
    }
}

submit.addEventListener('click', addShips)

function addShipsTwo() {
    placeShips.removeChild(document.getElementById('grid0'));
    createBoard(placeShips, 'input', 'checkbox');
    submit.textContent = 'Play';
}

function changeTurn() {
    if(document.querySelector('.turn')){
        document.querySelector('.turn').remove();

    }

    playerTurn++

    removeBoards();
    let turn = document.createElement('p');
    placeShips.appendChild(turn);
    turn.classList.add('turn');
    if(playerTurn % 2 !== 0){
        turn.textContent= `Player one's turn`
        submit.textContent = 'Shoot';

        submit.removeEventListener('click', shoot);
        submit.addEventListener('click', showBothBoards);
    } else {
        if (opponent === 0){
            turn.textContent = 'Computer is playing';
            submit.textContent = 'Wait'
        } else {
            turn.textContent= `Player two's turn`;
            submit.removeEventListener('click', shoot);
            submit.addEventListener('click', showBothBoards);
        }

    }

}

function computerPlays() {
    if(document.querySelector('.turn')){
        document.querySelector('.turn').remove();
    }

    removeBoards();
    let turn = document.createElement('p');
    placeShips.appendChild(turn);
    turn.classList.add('turn');
    submit.removeEventListener('click', shoot);
    submit.addEventListener('click', showBothBoards);
    let shot;
    let ind1;
    let ind2;
    function compShoot() {
        shot = Math.floor(Math.random()*100).toString();
        console.log(shot)
        if(shot.length === 2){
            ind1 = Number(shot[0]);
            ind2 = Number(shot[1])
        } else {
            ind1 = 0;
            ind2 = Number(shot[0])
        }
        switch(pOneBoard[ind1][ind2]){
            case 0:
                pOneBoard[ind1][ind2] = 1
                break;
            case 1: 
            case 3:
            console.log('comp has already shot here, shooting again!')

                compShoot();
                break;
            case 2:
                pOneBoard[ind1][ind2] = 3
                break;
            default:
                console.log('program broke!')
        }
    }
    console.log(pOneBoard)
    compShoot();
}

let enemyBoard;
let playerBoard;

function removeBoards() {
    let boards = document.querySelectorAll('.grid');
    boards.forEach(board => board.remove())
}

function showBothBoards() {
    if (opponent === 0) {
        removeBoards();
        submit.removeEventListener('click', showBothBoards);
        submit.addEventListener('click', shoot);
        enemyBoard = createBoard(placeShips, 'input', 'checkbox');
        playerBoard = createBoard(placeShips, 'div');
        for(let i = 0; i<10; i++){
            for(let x = 0; x<10; x++){
                let currentCell = document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`);
                let currentCheckbox = document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`);
                let currentSpan = document.querySelector(`#grid${gridNum-2} #span${i}-${x}`);

                switch(pOneBoard[i][x]) {
                    case 0:
                        currentCell.classList.add('water')
                        break;
                    case 1:
                        currentCell.classList.add('waterHit')
                        break;
                    case 2:
                        currentCell.classList.add('ship')
                        break;
                    case 3:
                        currentCell.classList.add('shipHit')
                        break;
                    default:
                        console.log('something went wrong')
                        break;
                }
                switch(pTwoBoard[i][x]) {
                    case 0:
                        currentCheckbox.classList.add('water')
                        currentSpan.classList.add('water')

                        break;
                    case 1:
                        currentCheckbox.classList.add('waterHit')
                        currentSpan.classList.add('waterHit')

                        break;
                    case 2:
                    case 4:
                    case 6:
                    case 8:
                    case 10:
                        currentCheckbox.classList.add('water')
                        currentSpan.classList.add('water')

                        break;
                    case 3:
                        currentCheckbox.classList.add('destroyerHit')
                        currentSpan.classList.add('destroyerHit')
                        break;
                    case 5:
                        currentCheckbox.classList.add('submarineHit')
                        currentSpan.classList.add('submarineHit')
                        break
                    case 7:
                        currentCheckbox.classList.add('cruiserHit')
                        currentSpan.classList.add('cruiserHit')
                        break;
                    case 9:
                        currentCheckbox.classList.add('battleshipHit')
                        currentSpan.classList.add('battleshipHit')
                        break;
                    case 11:
                        currentCheckbox.classList.add('carrierHit')
                        currentSpan.classList.add('carrierHit')
                        break;
                    default:
                        console.log('something went wrong')
                        break;
                }                
            }
        }
    } else {
        submit.removeEventListener('click', showBothBoards);
        submit.addEventListener('click', shoot);
        console.log(`player turn is ${playerTurn}`)
        
        enemyBoard = createBoard(placeShips, 'input', 'checkbox');
        playerBoard = createBoard(placeShips, 'div');
        console.log(`this is gridNum ${gridNum}`)
        if(playerTurn % 2 !== 0) {
            for(let i = 0; i<10; i++){
                for(let x = 0; x<10; x++){
                    let currentCell = document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`);
                    let currentCheckbox = document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`);
                    let currentSpan = document.querySelector(`#grid${gridNum-2} #span${i}-${x}`);

                    switch(pOneBoard[i][x]) {
                        case 0:
                            currentCell.classList.add('water')
                            break;
                        case 1:
                            currentCell.classList.add('waterHit')
                            break;
                        case 2:
                            currentCell.classList.add('ship')
                            break;
                        case 3:
                            currentCell.classList.add('shipHit')
                            break;
                        default:
                            console.log('something went wrong')
                            break;
                    }
                    switch(pTwoBoard[i][x]) {
                        case 0:
                            currentCheckbox.classList.add('water')
                            currentSpan.classList.add('water')

                            break;
                        case 1:
                            currentCheckbox.classList.add('waterHit')
                            currentSpan.classList.add('waterHit')

                            break;
                        case 2:
                            currentCheckbox.classList.add('water')
                            currentSpan.classList.add('water')

                            break;
                        case 3:
                            currentCheckbox.classList.add('shipHit')
                            currentSpan.classList.add('shipHit')
                            break;
                        default:
                            console.log('something went wrong')
                            break;
                    }                
                }
            }
        } else {
            for(let i = 0; i<10; i++){
                for(let x = 0; x<10; x++){
                    let currentCell = document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`);
                    let currentCheckbox = document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`);
                    let currentSpan = document.querySelector(`#grid${gridNum-2} #span${i}-${x}`);

                    switch(pTwoBoard[i][x]) {
                        case 0:
                            currentCell.classList.add('water')
                            break;
                        case 1:
                            currentCell.classList.add('waterHit')
                            break;
                        case 2:
                            currentCell.classList.add('ship')
                            break;
                        case 3:
                            currentCell.classList.add('shipHit')
                            break;
                        default:
                            console.log('something went wrong')
                            break;
                    }
                    switch(pOneBoard[i][x]) {
                        case 0:
                            currentCheckbox.classList.add('water')
                            currentSpan.classList.add('water')

                            break;
                        case 1:
                            currentCheckbox.classList.add('waterHit')
                            currentSpan.classList.add('waterHit')

                            break;
                        case 2:
                            currentCheckbox.classList.add('water')
                            currentSpan.classList.add('water')

                            break;
                        case 3:
                            currentCheckbox.classList.add('shipHit')
                            currentSpan.classList.add('shipHit')

                            break;
                        default:
                            console.log('something went wrong')
                            break;
                    }
                }
            }
        }
    
    }

    submit.textContent = ('Shoot');

}

function shoot(){
    if(playerTurn % 2 !== 0){
        console.log('attacking 2');
        for(let i = 0; i<10; i++){
            for(let x = 0; x<10; x++){
                if(document.getElementById(`checkbox${i}-${x}`).checked === true){
                    switch(pTwoBoard[i][x]) {
                        case 0:
                            pTwoBoard[i][x] = 1
                            break;
                        case 2:
                            pTwoBoard[i][x] = 3
                            break;
                        default:
                            console.log('you have already shot here')
                    }
                }
                
            }
        }
        checkShips(pTwoBoard);

        console.log(pTwoBoard)
    } else {
        if (opponent == 0){ //computer player 2
            computerPlays();
        } else { //real player 2
            console.log('attacking 1');
        
            for(let i = 0; i<10; i++){
                for(let x = 0; x<10; x++){
                    if(document.getElementById(`checkbox${i}-${x}`).checked === true){
                        switch(pOneBoard[i][x]) {
                            
                        }
                    }
                    
                }
            }
        }

        checkShips(pOneBoard);
    }
}


//checking array to see if all ships are hit
//more precisely, if there are no more 2s in array
//meaning all that is left in the array is 0, 1, or 3
//water, water hit, or ship hit
//at this point, the game ends
function checkShips(array) {
    let waterOrShipHit = 0;
    for (let i = 0; i<10; i++){
        for(let x = 0; x< 10; x++){
            if(array[i][x] !== 2){
                waterOrShipHit++
            }
        }
    }
    if(waterOrShipHit === 100){
        endGame();
    } else {
        changeTurn();
    }
}

function endGame() {
    console.log('Game ended')
}
