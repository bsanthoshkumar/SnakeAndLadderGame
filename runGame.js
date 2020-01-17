const range = (start, end) => {
  if (start == end) return [start];
  if (start < end) return [start, ...range(start + 1, end)];
  return [start, ...range(start - 1, end)];
};

const createCell = (cellId, rowId, newRow) => {
  const newCell = document.createElement('td');
  newCell.className = 'cell';
  newCell.id = (rowId - 1) * 10 + cellId;
  newCell.innerText = (rowId - 1) * 10 + cellId;
  newRow.appendChild(newCell);
};

const createRow = (rowId, grid) => {
  const newRow = document.createElement('tr');
  newRow.className = 'row';
  grid.appendChild(newRow);
  const cellsOrder = rowId % 2 != 0 ? range(1, 10) : range(10, 1);
  cellsOrder.forEach(cellId => createCell(cellId, rowId, newRow));
};

const createGrid = () => {
  const grid = document.getElementById('gameZone');
  const rowsOrder = range(10, 1);
  rowsOrder.forEach(rowId => createRow(rowId, grid));
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
  const playersOrder = range(1, noOfPlayers);
  playersOrder.forEach(playerIndex => createTextBox(gameTools, playerIndex));
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
