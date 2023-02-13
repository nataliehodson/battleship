const placeShips = document.querySelector('.placeShips');
const submit = document.querySelector('.submit');

//USE THIS KIND OF THING TO CHECK IF CELL ALREADY TAKEN UP
/*

checkArr()*/


let oponent = 0;
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
let usedCells = [];


function whichShip() {

    let i=0;

    while (i < 5){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 10
        i++
    }
    while (4 < i < 9){
        console.log(usedCells[i][1])
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 8
        i++
    }
    while (8 < i < 12){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 6
        i++
    }
    while (11 < i < 15){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 4
        i++
    }
    while (14 < i){
        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        pTwoBoard[i1][i2] = 2
        i++
    }

    /*for(let i = 0; i < usedCells.length; i++){

        let i1 = usedCells[i][1];
        let i2 = usedCells[i][3];
        let carrier = usedCells.slice(0,5).join('');// 5 long
        let battleship = usedCells.slice(5,9).join('');//4 long
        let cruiser = usedCells.slice(9,12).join('');//3 long
        let submarine = usedCells.slice(12,15).join('');//3 long
        let destroyer = usedCells.slice(15,17).join('');//2 long
        console.log(carrier)
        console.log(battleship)
        console.log(cruiser)
        console.log(submarine)
        console.log(destroyer)

        let index=1;
        /*for(const coordinate of carrier){
            let ind1;
            let ind2;
            pTwoBoard[carrier[ind1]][ind2] = 10

        }
        
        while(i<5){
            pTwoBoard[i1][i2] = 10

        }

        /*switch(usedCells[i]){
            case i<5:
                pTwoBoard[i1][i2] = 10
                break;
            case 4<i<8:
                pTwoBoard[i1][i2] = 8
                break;
            case 7<i<10:
                pTwoBoard[i1][i2] = 6
                break;
            case 9<i<12:
                pTwoBoard[i1][i2] = 4
                break;
            case 11<i<14:
                pTwoBoard[i1][i2] = 2
                break;
            default:
                console.log(`couldn't assign correct numbers to ships`)
        }
    }*/



    /*switch(ships[x].name){
        case 'destroyer':
            pTwoBoard[index1][index2] = 2
            break;
        case 'submarine':
            pTwoBoard[index1][index2] = 4
            break;
        case 'cruiser':
            pTwoBoard[index1][index2] = 6
            break;
        case 'battleship':
            pTwoBoard[index1][index2] = 8
            break;
        case 'carrier':
            pTwoBoard[index1][index2] = 10
            break;

    }*/
}

function generateShips() {
    startCells = [...Array(5)].map(x => Math.floor(Math.random() * 100).toString());
    let directions = [...Array(5)].map(x => Math.floor(Math.random() * 2));
    
    ships.push(new ship('carrier', 5, startCells[4], directions[4], {}));
    ships.push(new ship('battleship', 4, startCells[3], directions[3], {}));
    ships.push(new ship('cruiser', 3, startCells[2], directions[2], {}));
    ships.push(new ship('submarine', 3, startCells[1], directions[1], {}));
    ships.push(new ship('destroyer', 2, startCells[0], directions[0], {}));


    
    for(let x = 0; x < ships.length; x++){//iterate through ship array
        let cellCount = 0;
        for(let i = 0; i< 100; i++){//iterate through cells
            if (ships[x].startCell == i){


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

                    //whichShip(index1, index2, x);

                    pTwoBoard[index1][index2] = 2;

                    if (ships[x].direction === 0) {//horizontal
                        console.log('hozzy')
                        if (Number(index2)+Number(ships[x].cells) > 10){

                            for(let z = 0; z < Number(ships[x].cells); z++){
                                checkCollision(index1, newindex2, x);
                                console.log(index1, newindex2)

                                //whichShip(index1, newindex2, x);

                                pTwoBoard[index1][newindex2] = 2
                                newindex2--
                            }
                        } else {
                            for(let z = 0; z < Number(ships[x].cells); z++){
                                checkCollision(index1, newindex2, x);
                                console.log(index1, newindex2)

                                //whichShip(index1, newindex2, x);
                                pTwoBoard[index1][newindex2] = 2
                                newindex2++;
                            }

                        }
                    } else { //vertical
                        console.log('vertizzy')
                        for(let z = 0; z < Number(ships[x].cells); z++){
                            if (Number(index1)+Number(ships[x].cells) > 10){
                                checkCollision(newindex1, index2, x);
                                console.log(newindex1, index2)

                                //whichShip(newindex1, index2, x);

                                pTwoBoard[newindex1][index2] = 2
                                newindex1--;
                            } else {
                                checkCollision(newindex1, index2, x);
                                console.log(newindex1, index2)

                                //whichShip(newindex1, index2, x);

                                pTwoBoard[newindex1][index2] = 2
                                newindex1++;
                
                            }
                        }

                    }

                }

                shipIndices();

                function checkCollision(index1, index2, ship){
                    cellCount++;


                    let currentCells = [];
                    currentCells.push(index1, index2);

                    let usedCellsStringified = JSON.stringify(usedCells)
                    currentCells = JSON.stringify(currentCells);
                    let indexOfArr = usedCellsStringified.indexOf(currentCells);
                    if(indexOfArr != -1){
                        console.log('COLLISION')
                        ships[ship].startCell = Math.floor(Math.random() * 100).toString();
                        ships[ship].direction = Math.floor(Math.random() * 2);
                        console.log('new starting point and direction');
                        console.log(cellCount, 'this is the cell count')
                        usedCells.push(currentCells);

                        console.log('used cells ',usedCells)

                        while(cellCount>0){
                            let removedcells = usedCells.pop();
                            console.log('should be removed-', removedcells)
                            cellCount--;
                        }
                        console.log('used cells (popped)',usedCells)
                        shipIndices();
                    } else {
                        usedCells.push(currentCells);
                        console.log('no collision');
                    }
                }
                
                
            }
            //MAKE THINGS NOT OVERLAP IN ARRAY
        }

        console.log('ships added ',x+1)

    }
    console.log(pTwoBoard);

    whichShip();
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
        
        if (oponent === 0){ //opponent is computer
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
        if(oponent === 0) { //if against comp, skip add ship screen
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
        if (oponent === 0){
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
    if (oponent === 0) {
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
        submit.removeEventListener('click', showBothBoards);
        submit.addEventListener('click', shoot);
        console.log(`player turn is ${playerTurn}`)
        
        enemyBoard = createBoard(placeShips, 'input', 'checkbox');
        playerBoard = createBoard(placeShips, 'div');
        console.log(`this is gridNum ${gridNum}`)
        if(playerTurn % 2 !== 0) {
            for(let i = 0; i<10; i++){
                for(let x = 0; x<10; x++){
                    switch(pOneBoard[i][x]) {
                        case 0:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('water')
                            break;
                        case 1:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('waterHit')
                            break;
                        case 2:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('ship')
                            break;
                        case 3:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('shipHit')
                            break;
                        default:
                            console.log('something went wrong')
                            break;
                    }
                    switch(pTwoBoard[i][x]) {
                        case 0:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('water')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('water')

                            break;
                        case 1:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('waterHit')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('waterHit')

                            break;
                        case 2:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('water')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('water')

                            break;
                        case 3:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('shipHit')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('shipHit')
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
                    switch(pTwoBoard[i][x]) {
                        case 0:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('water')
                            break;
                        case 1:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('waterHit')
                            break;
                        case 2:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('ship')
                            break;
                        case 3:
                            document.querySelector(`#grid${gridNum-1} #cell${i}-${x}`).classList.add('shipHit')
                            break;
                        default:
                            console.log('something went wrong')
                            break;
                    }
                    switch(pOneBoard[i][x]) {
                        case 0:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('water')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('water')

                            break;
                        case 1:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('waterHit')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('waterHit')

                            break;
                        case 2:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('water')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('water')

                            break;
                        case 3:
                            document.querySelector(`#grid${gridNum-2} #checkbox${i}-${x}`).classList.add('shipHit')
                            document.querySelector(`#grid${gridNum-2} #span${i}-${x}`).classList.add('shipHit')

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


function cellState(array, row, col) {
    switch(array[row][col]) {
        case 0:
            console.log('water')
            break;
        case 1:
            console.log('water hit')
            break;
        case 2: 
            console.log('ship')
            break;
        case 3:
            console.log('ship hit')
            break;
        default:
            console.log('nothing')
            break;
    }
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
        if (oponent == 0){ //computer player 2
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
