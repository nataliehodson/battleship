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
const whatShip = document.querySelectorAll('.shipColour');
const shipLineThrough = document.querySelectorAll('.shipNames p');
const shipBoards = document.querySelector('.shipBoards');


let opponent = 0;
let pOneBoard = [];
let pTwoBoard = [];
let playerTurn = 0;
let gridNum = 0;
let startCells;
let index1;
let index2;
let newindex1;
let newindex2;
let ships = [];
let usedCells = [];
let finished = false;
let enemyBoard;
let playerBoard;


//Choose if one or two people are playing
function whoPlays(){
    if(playerOptions[0].checked){
        opponent = 0;
        document.querySelector('h1').style.fontSize = '45px';
        createBoard(shipBoards, 'input', 'checkbox');
        shipBoards.style.flexDirection = 'row';
        shipBoards.style.height = '350px';
        placeShips.style.display = 'flex';
        placeShips.style.flexDirection = 'column';
        shipNames.style.display = 'block';
        submit.style.display = 'block';
        whatPlayers.style.display = 'none';
        turn.style.display = 'block';
        turn.textContent = 'Please click the squares on the board to place your ships.'
    } else if (playerOptions[1].checked){
        opponent = 1;
        document.querySelector('h1').style.fontSize = '45px';
        whatPlayers.style.display = 'none';
        startCont.style.display = 'flex';
    } else {
        enterName.textContent = 'Please select how many people are playing.'
    }
}

playerSubmit.addEventListener('click', whoPlays);

//Create two arrays representing the players boards
function createBoardArray(array) {
    for(let i = 0; i<10; i++){
        array.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
}

createBoardArray(pOneBoard);
createBoardArray(pTwoBoard);

//If two people are playing, make sure they enter different names.
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
        shipNames.style.display = 'block';

        submit.style.display = 'block'
        startCont.style.display = 'none';
        turn.innerHTML = `${pOne.value}'s turn.<br>Please click the squares on the board to place your ships.`
        createBoard(shipBoards, 'input', 'checkbox');
    }
}

nameSubmit.addEventListener('click', boardAppear)


//create grids, either non-clickable or clickable
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

//use different numbers to represent different ships on the players' boards
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

//when playing against the computer, randomly place ships
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
                        //check that it doesn't fit in 10x10 grid
                        if (Number(index2)+Number(shipLength) >= 10) {
                        //iterate through every ship cell
                            for(let z = 0; z < Number(shipLength); z++){
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
                        if (Number(index1)+Number(shipLength) >= 10){
                            for(let z = 0; z < Number(shipLength); z++){
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
                    collision = false;
                    cellCount++;
                    let currentCells = [];
                    currentCells.push(index1, index2);

                    let usedCellsStringified = JSON.stringify(usedCells)
                    currentCells = JSON.stringify(currentCells);
                    let indexOfArr = usedCellsStringified.indexOf(currentCells);
                    if(indexOfArr != -1){ // current coordinates are already occupied
                        collision = true;
                        ships[ship].startCell = Math.floor(Math.random() * 100).toString();
                        ships[ship].direction = Math.floor(Math.random() * 2);

                        usedCells.push(currentCells);
                        let removedcells;

                        while(cellCount > 0){
                            removedcells = usedCells.pop();
                            cellCount--;
                        }
                        z=0;

                    } else {// current coordinates are not occupied
                        collision = false;
                        usedCells.push(currentCells);
                    }
                }
            }
        }
        if(collision === true) {
            x--;
        }
    }
    whichShip();
}

//show your ships on screen
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


//prompt player two to add their ships
function addShipsTwo() {
    shipBoards.removeChild(document.getElementById('grid0'));
    createBoard(shipBoards, 'input', 'checkbox');
    submit.textContent = 'Play';
    turn.innerHTML = `${pTwo.value}'s turn.<br>Please click the squares on the board to place your ships.`
}


//When two people are playing, show a screen between turn
//Don't show it when playing against the computer
function changeTurn() {
    shipNames.style.display = 'none';
    gridCont.style.display = 'none';
    playerTurn++
    removeBoards();
    if(opponent === 0){
        if(playerTurn % 2 !== 0){
            turn.textContent = 'Click on the squares of the upper board to aim and then click on the Shoot button. You have one shot per turn.'
            submit.textContent = 'Start';
            submit.removeEventListener('click', shoot);
            submit.addEventListener('click', showBothBoards);
        } else {
            computerPlays();
        }
    } else {
        if(playerTurn % 2 !== 0){
            turn.innerHTML= `${pOne.value}'s turn.<br>Click on the squares of the upper board to aim and then click on the Shoot button. You have one shot per turn.`
            submit.textContent = 'Shoot';
            submit.removeEventListener('click', shoot);
            submit.addEventListener('click', showBothBoards);
        } else {
            turn.innerHTML= `${pTwo.value}'s turn.<br>Click on the squares of the upper board to aim and then click on the Shoot button. You have one shot per turn.`;
            submit.removeEventListener('click', shoot);
            submit.addEventListener('click', showBothBoards);
        }
    }
}


//computer shoots
function computerPlays() {
    removeBoards();
    checkShips(pOneBoard);
    if (finished === false){
        submit.removeEventListener('click', shoot);
        submit.addEventListener('click', showBothBoards);
        let shot;
        let ind1;
        let ind2;
        function compShoot() {
            shot = Math.floor(Math.random()*100).toString();
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
                    compShoot();
                    break;
                case 2:
                    pOneBoard[ind1][ind2] = 3
                    break;
                default:
                    console.log('program broke!')
            }
        }
        compShoot();
    }
    showBothBoards();
}

//remove both player's and opponent's boards
function removeBoards() {
    let boards = document.querySelectorAll('.grid');
    boards.forEach(board => board.remove())
}

//show your and your opponent's boards
function showBothBoards() {
    /*let toShoot = document.createElement('div');
    placeShips.insertBefore(toShoot, gridCont);*/
    gridCont.style.display = 'flex';
    shipNames.style.display = 'flex';
    shipNames.querySelector('h3').textContent = 'Ships to shoot:';

    shipBoards.style.display = 'flex';
    shipBoards.style.justifyContent = 'space-evenly';
    shipBoards.style.alignItems = 'center';
    shipBoards.style.flexDirection = 'column';
    shipBoards.style.height = '650px';
    placeShips.style.flexDirection = 'column';
    placeShips.style.alignItems = 'center';
    if (opponent === 0) {
        if(playerTurn % 2 == 0) {
            removeBoards();
        }
        submit.removeEventListener('click', showBothBoards);
        submit.addEventListener('click', shoot);
        enemyBoard = createBoard(shipBoards, 'input', 'checkbox');
        playerBoard = createBoard(shipBoards, 'div');
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
        enemyBoard = createBoard(shipBoards, 'input', 'checkbox');
        playerBoard = createBoard(shipBoards, 'div');
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

//show player how many ship cells are left to be shot in single player mode
function whichShipShot(ship) {
    if (opponent == 0){
        switch(ship){
            case 3:
                whatShip[4].textContent = whatShip[4].textContent.slice(0, whatShip[4].textContent.length - 1);
                if(whatShip[4].textContent == ''){
                    barShip(shipLineThrough[4]);
                }
                break;
            case 5: 
                whatShip[3].textContent = whatShip[3].textContent.slice(0, whatShip[3].textContent.length - 1);
                if(whatShip[3].textContent == ''){
                
                    barShip(shipLineThrough[3]);
                }
                break;
            case 7:
                whatShip[2].textContent = whatShip[2].textContent.slice(0, whatShip[2].textContent.length - 1);
                if(whatShip[2].textContent == ''){
                
                    barShip(shipLineThrough[2]);
                }
                break;
            case 9:
                whatShip[1].textContent = whatShip[1].textContent.slice(0, whatShip[1].textContent.length - 1);
                if(whatShip[1].textContent == ''){
                
                    barShip(shipLineThrough[1]);
                }
                break;
            case 11:
                whatShip[0].textContent = whatShip[0].textContent.slice(0, whatShip[0].textContent.length - 1);
                if(whatShip[0].textContent == ''){
                    barShip(shipLineThrough[0]);
                }
                break;          
        }
    }

}

//put a line through name of sunken ships
function barShip(ship) {
    ship.style.textDecoration = 'line-through';
    
}


//record location where players shot
function shoot(){
    if (opponent == 0){ //computer player 2
        if(playerTurn % 2 !== 0){
            for(let i = 0; i<10; i++){
                for(let x = 0; x<10; x++){
                    if(document.getElementById(`checkbox${i}-${x}`).checked === true){
                        switch(pTwoBoard[i][x]) {
                            case 0:
                                pTwoBoard[i][x] = 1
                                break;
                            case 2:
                                pTwoBoard[i][x] = 3;
                                whichShipShot(3);
                                break;
                            case 4:
                                pTwoBoard[i][x] = 5
                                whichShipShot(5);

                                break;
                            case 6:
                                pTwoBoard[i][x] = 7
                                whichShipShot(7);

                                break;
                            case 8:
                                pTwoBoard[i][x] = 9
                                whichShipShot(9);

                                break;
                            case 10:
                                pTwoBoard[i][x] = 11
                                whichShipShot(11);

                                break;
                            default:
                                console.log('you have already shot here')
                        }
                    }
                    
                }
            }

            checkShips(pTwoBoard);
        } else {
            computerPlays();
        }
    } else { //real player 2
        if(playerTurn % 2 !== 0){
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
function checkShips(array) {
    let waterOrShipHit = 0;
    for (let i = 0; i<10; i++){
        for(let x = 0; x< 10; x++){
            if(opponent === 0){
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


let p = document.createElement('p');
let restartButton = document.createElement('button');


//disable checkboxes, show restart button, say who won
function endGame(whichPlayer) {
    submit.style.display = 'none';
    placeShips.appendChild(p);
    p.style.fontSize = '40px';
    p.style.marginTop = '0px';
    p.style.marginBottom = '15px';

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.disabled = true);

    placeShips.appendChild(restartButton);
    restartButton.addEventListener('click', restartGame)
    restartButton.textContent = 'Restart'

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

//reload the page when you press the restart button
function restartGame() {
    location.reload();
}