export default class extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {}

  create() {
    this.add.text(250, 250, "GAME OVER", {
      fontSize: "50px",
      fill: "#1af",
    });
  }

  update() {}
}