export default class extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init() {}

  preload() {}

  create() {
    this.add.text(300, 300, "WINNER", {
      fontSize: "50px",
      fill: "#1af",
    });
  }

  update() {}
}
