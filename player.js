class Player {
  constructor(name, coin, currentPosition, previousPosition) {
    this.name = name;
    this.coin = `<img src=${coin} width="20px" height="15px"/>`;
    this.currentPosition = currentPosition;
    this.previousPosition = previousPosition;
  }

  moveBy(diceValue) {
    this.previousPosition = this.currentPosition;
    if (this.currentPosition + diceValue <= 100) {
      this.currentPosition += diceValue;
    }
  }

  moveTo(position) {
    this.currentPosition = position;
  }

  get checkWinStatus() {
    return this.currentPosition == 100;
  }
}
