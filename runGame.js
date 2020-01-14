const createEvenRowCells = (newRow, row) => {
  for (let cell = 10; cell >= 1; cell--) {
    const newCell = document.createElement('td');
    newCell.className = 'cell';
    newCell.id = (row - 1) * 10 + cell;
    newCell.innerText = (row - 1) * 10 + cell;
    newRow.appendChild(newCell);
  }
};

const createOddRowCells = (newRow, row) => {
  for (let cell = 1; cell <= 10; cell++) {
    const newCell = document.createElement('td');
    newCell.className = 'cell';
    newCell.id = (row - 1) * 10 + cell;
    newCell.innerText = (row - 1) * 10 + cell;
    newRow.appendChild(newCell);
  }
};

const createGrid = () => {
  const grid = document.getElementById('gameZone');
  for (let row = 10; row >= 1; row--) {
    const newRow = document.createElement('tr');
    newRow.className = 'row';
    grid.appendChild(newRow);
    const createRowElements =
      row % 2 == 0 ? createEvenRowCells : createOddRowCells;
    createRowElements(newRow, row);
  }
};

const getElement = id => document.getElementById(id);

const createDice = game => {
  const gameTools = getElement('gameTools');
  const dice = document.createElement('img');
  dice.src = './assets/dice_6.png';
  dice.id = 'dice';
  dice.onclick = changePlayerPosition.bind(null, game);
  gameTools.appendChild(dice);
};

const changeDice = diceValue => {
  const images = {
    1: './assets/dice_1.png',
    2: './assets/dice_2.png',
    3: './assets/dice_3.png',
    4: './assets/dice_4.png',
    5: './assets/dice_5.png',
    6: './assets/dice_6.png'
  };
  getElement('dice').src = images[diceValue];
};

const changePlayerPosition = game => {
  game.changePlayerList();
  const diceValue = game.rollDice;
  console.log(diceValue);
  changeDice(diceValue);
  game.updatePlayerPosition(diceValue);
  const { coin, previousPosition, currentPosition } = game.updatedPositions;
  if (previousPosition != 0) {
    getElement(previousPosition).innerHTML = previousPosition;
  }
  getElement(currentPosition).innerHTML += coin;
};

const startGame = (game, noOfPlayers) => {
  const gameTools = getElement('gameTools');
  for (let index = 1; index <= noOfPlayers; index++) {
    const playername = getElement(`player${index}`).value;
    gameTools.removeChild(getElement(`player${index}`));
    game.createPlayer(playername);
  }
  gameTools.removeChild(getElement('start'));
  createDice(game);
};

const createTextBox = (gameTools, index) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = `player${index}`;
  input.value = `player${index}`;
  input.className = 'textbox';
  gameTools.appendChild(input);
};

const createStartButton = (game, noOfPlayers) => {
  const start = document.createElement('button');
  start.innerText = 'Start Game !';
  start.id = 'start';
  start.onclick = startGame.bind(null, game, noOfPlayers);
  gameTools.appendChild(start);
};

const printTextBoxes = (game, noOfPlayers) => {
  const gameTools = getElement('gameTools');
  gameTools.removeChild(getElement('2Player'));
  gameTools.removeChild(getElement('3Player'));
  for (let index = 1; index <= noOfPlayers; index++) {
    createTextBox(gameTools, index);
  }
  createStartButton(game, noOfPlayers);
};

const attachEventListeners = game => {
  getElement('2Player').onclick = printTextBoxes.bind(null, game, 2);
  getElement('3Player').onclick = printTextBoxes.bind(null, game, 3);
};

const main = function() {
  createGrid();
  const game = new Game([
    './assets/ball1.png',
    './assets/ball2.png',
    './assets/ball3.png'
  ]);
  attachEventListeners(game);
};
