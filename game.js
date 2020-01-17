class Game {
  constructor(playerCoins) {
    this.playerList = [];
    this.playerCoins = playerCoins;
    this.currentPlayer = '';
  }

  createPlayer(playerName) {
    const coin = this.playerCoins.shift();
    this.playerList.push(new Player(playerName, coin, 0, 0));
  }

  get rollDice() {
    return Math.ceil(Math.random() * 6);
  }

  changePlayerList() {
    this.currentPlayer = this.playerList.shift();
    this.playerList.push(this.currentPlayer);
  }

  updatePlayerPosition(diceValue) {
    this.currentPlayer.moveBy(diceValue);
  }

  get updatedPositions() {
    const { coin, previousPosition, currentPosition } = this.currentPlayer;
    return { coin, previousPosition, currentPosition };
  }
}
