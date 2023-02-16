const placeShips = document.querySelector('.placeShips');
const submit = document.querySelector('.submit');
const playerOptions = document.getElementsByName('numberPlayers');
const playerSubmit = document.querySelector('.playerSubmit');
const whatPlayers = document.querySelector('.whatPlayers');
const startCont = document.querySelector('.startCont');
const enterName = document.querySelector('.enterName');
const nameRequest = document.querySelector('.nameRequest');
const pOne = document.querySelector('.pOne');
const pTwo = document.querySelector('.pTwo');
const nameSubmit = document.querySelector('.nameSubmit')
const turn = document.querySelector('.turn');
const gridCont = document.querySelector('.gridCont');
const shipNames = document.querySelector('.shipNames');

let opponent = 0;
let pOneBoard = [];
let pTwoBoard = [];
let playerTurn = 0;

window.addEventListener('load', () => placeShips.style.display = 'none')

function whoPlays(){
    if(playerOptions[0].checked){
        opponent = 0;
        createBoard(gridCont, 'input', 'checkbox')
        placeShips.style.display = 'flex';
        submit.style.display = 'block';
        whatPlayers.style.display = 'none';
    } else if (playerOptions[1].checked){
        opponent = 1;
        whatPlayers.style.display = 'none';
        startCont.style.display = 'flex';
    } else {
        enterName.textContent = 'Please select how many people are playing.'
    }
}

playerSubmit.addEventListener('click', whoPlays)

//First, create two arrays representing the players boards
function createBoardArray(array) {
    for(let i = 0; i<10; i++){
        array.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
}

createBoardArray(pOneBoard);
createBoardArray(pTwoBoard);

function boardAppear() {
    nameRequest.textContent = 'Please enter your names!'
    if(!pOne.value || !pTwo.value){
        nameRequest.style.display = 'block'
        pOne.focus();
        
    } else if (pOne.value === pTwo.value) {
        nameRequest.style.display = 'block';
        nameRequest.textContent = 'Enter different names please!'
        pOne.focus();

    } else {
        placeShips.style.display = 'flex';
        placeShips.style.flexDirection = 'column';
        submit.style.display = 'block'
        startCont.style.display = 'none';
        turn.textContent = `${pOne.value}'s turn.`
        createBoard(gridCont, 'input', 'checkbox');
    }
}

nameSubmit.addEventListener('click', boardAppear)


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
let usedCells = [];


function whichShip() {
    for (let i=0; i < 5; i++){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 10
    }
    for (let i=5;i < 9; i++){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 8
    }
    for (let i=9;i < 12; i++){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 6
    }
    for (let i=12;i < 15; i++){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 4
    }
    for (let i=15;i < 17; i++){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 2
    }
}

function generateShips() {
    gridCont.style.display = 'none';

    startCells = [...Array(5)].map(x => Math.floor(Math.random() * 100).toString());
    let directions = [...Array(5)].map(x => Math.floor(Math.random() * 2));
    
    ships.push(new ship('carrier', 5, startCells[4], directions[4], {}));
    ships.push(new ship('battleship', 4, startCells[3], directions[3], {}));
    ships.push(new ship('cruiser', 3, startCells[2], directions[2], {}));
    ships.push(new ship('submarine', 3, startCells[1], directions[1], {}));
    ships.push(new ship('destroyer', 2, startCells[0], directions[0], {}));

    let shipLength;
    let collision = false;

    for(let x = 0; x < ships.length; x++){//iterate through ship array
        collision = false;
        shipLength = ships[x].cells;
        let cellCount = 0;
        for(let i = 0; i< 100; i++){//iterate through cells
            if (ships[x].startCell == i){
                let numChecked = 1;
                function shipIndices(){//get correct starting cell
                    console.log('Placing ', ships[x].name, ' it starts at ',ships[x].startCell, ' its length is ', Number(ships[x].cells), ' its direction is ', ships[x].direction)
                    
                    if(ships[x].startCell.length === 2){//if the starting cell is two digits long
                        index1 = Number(ships[x].startCell[0]);
                        index2 = Number(ships[x].startCell[1])
                    } else { //if the starting cell is one digit long
                        index1 = 0;
                        index2 = Number(ships[x].startCell[0])
                    }

                    newindex1 = index1;
                    newindex2 = index2;

                    if (ships[x].direction === 0) {//horizontal
                        console.log('horizontal')
                        //check that it doesn't fit in 10x10 grid
                        if (Number(index2)+Number(shipLength) >= 10) {
                        //iterate through every ship cell
                            for(let z = 0; z < Number(shipLength); z++){
                                console.log(index1, newindex2);
                                console.log(numChecked, shipLength)

                                if(numChecked <= shipLength){
                                    checkCollision(index1, newindex2, x, ships[x].direction, z, 'dec');

                                    if(collision === false){
                                        numChecked++;
                                        newindex2--;
                                    } else {
                                        numChecked = 0;
                                        collision = true;
                                        break;
                                    }
                                }
                            }
                        //check that it fits in 10x10 grid
                        } else {
                            for(let z = 0; z < Number(shipLength); z++){
                                console.log(index1, newindex2);
                                console.log(numChecked, shipLength)

                                if(numChecked <= shipLength){
                                    checkCollision(index1, newindex2, x, ships[x].direction, z, 'inc');

                                    if(collision === false){
                                        numChecked++;
                                        newindex2++;                                       
                                    } else {
                                        numChecked = 0;
                                        collision = true;
                                        break;
                                    }

                                }
                            }

                        }
                    } else { //vertical
                        console.log('vertical');
                        if (Number(index1)+Number(shipLength) >= 10){
                            for(let z = 0; z < Number(shipLength); z++){
                                console.log(newindex1, index2)
                                console.log(numChecked, shipLength)

                                if(numChecked <= shipLength){
                                    checkCollision(newindex1, index2, x, ships[x].direction, z, 'dec');

                                    if(collision === false){
                                        numChecked++;
                                        newindex1--;
                                    } else {
                                        numChecked = 0;
                                        collision = true;

                                        break;

                                    }
                                }
                            }
                        } else {
                            for(let z = 0; z < Number(shipLength); z++){
                                console.log(newindex1, index2)
                                console.log(numChecked, shipLength)

                                if(numChecked <= shipLength){
                                    checkCollision(newindex1, index2, x,ships[x].direction, z, 'inc');

                                    if(collision === false){
                                        newindex1++;
                                        numChecked++;

                                    } else {
                                        numChecked = 0;
                                        collision = true;
                                        
                                        break;
                                    }
                                }
                            }
                        }

                    }

                }

                shipIndices();

                function checkCollision(index1, index2, ship, direction, z, addOrSub){
                    console.log('checking collision')

                    collision = false;

                    cellCount++;

                    let currentCells = [];
                    currentCells.push(index1, index2);

                    let usedCellsStringified = JSON.stringify(usedCells)
                    currentCells = JSON.stringify(currentCells);
                    let indexOfArr = usedCellsStringified.indexOf(currentCells);
                    if(indexOfArr != -1){ // current coordinates are already occupied
                        collision = true;
                        console.log('COLLISION')
                        ships[ship].startCell = Math.floor(Math.random() * 100).toString();
                        ships[ship].direction = Math.floor(Math.random() * 2);
                        
                        console.log('new starting point and direction', ships[ship].startCell, ships[ship].direction);
                        console.log(cellCount, 'this is the cell count')
                        usedCells.push(currentCells);

                        console.log('used cells ',usedCells)

                        let removedcells;

                        while(cellCount > 0){
                            removedcells = usedCells.pop();
                            console.log('should be removed-', removedcells);
                            cellCount--;
                        }
                        z=0;
                        console.log('used cells (popped)',usedCells);

                    } else {// current coordinates are not occupied
                        collision = false;
                        usedCells.push(currentCells);
                        console.log('no collision');
                    }
                    console.log('used cells ',usedCells)
                }
            }
        }

        console.log('ships added ',x+1)
        if(collision === true) {
            x--;
        }
    }
    console.log('finished')

    whichShip();
    console.log(pTwoBoard);
}

function addShips() {
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
    gridCont.removeChild(document.getElementById('grid0'));
    createBoard(gridCont, 'input', 'checkbox');
    submit.textContent = 'Play';
    turn.textContent = `${pTwo.value}'s turn.`
}

function changeTurn() {
    shipNames.style.display = 'none';
    gridCont.style.display = 'none';
    if(document.querySelector('.turn')){
        document.querySelector('.turn').remove();
    }
    playerTurn++

    removeBoards();

    if(opponent === 0){
        if(playerTurn % 2 !== 0){
            submit.textContent = 'Start';
    
            submit.removeEventListener('click', shoot);
            submit.addEventListener('click', showBothBoards);
        } else {
            computerPlays();
        }
    } else {
        let turn = document.createElement('p');
        placeShips.prepend(turn);
        turn.classList.add('turn');
        if(playerTurn % 2 !== 0){
            turn.textContent= `${pOne.value}'s turn`
            submit.textContent = 'Shoot';
    
            submit.removeEventListener('click', shoot);
            submit.addEventListener('click', showBothBoards);
        } else {
            turn.textContent= `${pTwo.value}'s turn`;
            submit.removeEventListener('click', shoot);
            submit.addEventListener('click', showBothBoards);
        
        }
    }


}
let finished = false;
function computerPlays() {
    removeBoards();

    checkShips(pOneBoard);
    if (finished === false){
        if(document.querySelector('.turn')){
            document.querySelector('.turn').remove();
        }
    
        let turn = document.createElement('p');
        placeShips.appendChild(turn);
        turn.classList.add('turn');
        /*submit.removeEventListener('click', shoot);
        submit.addEventListener('click', showBothBoards);*/
    
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

    playerTurn++
    showBothBoards();
}

let enemyBoard;
let playerBoard;

function removeBoards() {
    let boards = document.querySelectorAll('.grid');
    boards.forEach(board => board.remove())
}

function showBothBoards() {
    gridCont.style.display = 'flex';
    gridCont.style.justifyContent = 'space-evenly';
    gridCont.style.alignItems = 'center';
    gridCont.style.flexDirection = 'column';
    gridCont.style.height = '650px';
    placeShips.style.flexDirection = 'column';
    placeShips.style.alignItems = 'center';
    if (opponent === 0) {
        if(playerTurn % 2 == 0) {
            removeBoards();
        }

        submit.removeEventListener('click', showBothBoards);
        submit.addEventListener('click', shoot);
        enemyBoard = createBoard(gridCont, 'input', 'checkbox');
        playerBoard = createBoard(gridCont, 'div');
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

        
        enemyBoard = createBoard(gridCont, 'input', 'checkbox');
        playerBoard = createBoard(gridCont, 'div');
        console.log(`this is gridNum ${gridNum}`);
        console.log(pOneBoard);
        console.log(pTwoBoard);
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
    if (opponent == 0){ //computer player 2
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
                            case 4:
                                pTwoBoard[i][x] = 5
                                break;
                            case 6:
                                pTwoBoard[i][x] = 7
                                break;
                            case 8:
                                pTwoBoard[i][x] = 9
                                break;
                            case 10:
                                pTwoBoard[i][x] = 11
                                break;
                            default:
                                console.log('you have already shot here')
                        }
                    }
                    
                }
            }

            checkShips(pTwoBoard);
            console.log(pTwoBoard);
        } else {
            console.log('computer is playing')
            computerPlays();
        }
    } else { //real player 2
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

        } else {
            console.log('attacking 1');
            for(let i = 0; i<10; i++){
                for(let x = 0; x<10; x++){
                    if(document.getElementById(`checkbox${i}-${x}`).checked === true){
                        switch(pOneBoard[i][x]) {
                            case 0:
                                pOneBoard[i][x] = 1
                                break;
                            case 2:
                                pOneBoard[i][x] = 3
                                break;
                            default:
                                console.log('you have already shot here')
                        }
                    }
                    
                }
            }
            checkShips(pOneBoard);
        }
    }

    
}


//checking array to see if all ships are hit
//more precisely, if there are no more 2s in array
//meaning all that is left in the array is 0, 1, or 3
//water, water hit, or ship hit
//at this point, the game ends
function checkShips(array) {
    console.log('checking ships')
    let waterOrShipHit = 0;
    for (let i = 0; i<10; i++){
        for(let x = 0; x< 10; x++){
            if(opponent === 0){
                console.log('playerTurn: ',playerTurn)
                if(playerTurn % 2 != 0){
                    if(array[i][x] !== 2 && array[i][x] !== 4 && array[i][x] !== 6 && array[i][x] !== 8 && array[i][x] !== 10){
                        waterOrShipHit++
                    }
                } else {
                    if(array[i][x] !==2){
                        waterOrShipHit++
                    }
                }
            } else {
                if(array[i][x] !==2){
                    waterOrShipHit++
                }
            }

        }
    }
    if(waterOrShipHit === 100){
        finished = true;
        if(opponent === 0){
            if(playerTurn % 2 !== 0){
                endGame('You');
            } else {
                endGame('Computer')
            }
        } else {
            if(playerTurn % 2 !== 0){
                endGame(`${pOne.value}`);
            } else {
                endGame(`${pTwo.value}`)
            }            
        }
    } else {
        finished = false;
        changeTurn();
    }
}

function endGame(whichPlayer) {
    console.log('Game ended');
    submit.style.display = 'none';
    let p = document.createElement('p');
    placeShips.appendChild(p);
    if(opponent === 0) {
        if(whichPlayer === 'You'){
            p.textContent = whichPlayer + ' win! Well done!';
        } else {
            p.textContent = 'You lost!';
        }
    } else {
        p.textContent = whichPlayer + ' wins!';
    }
}
