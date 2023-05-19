export default class extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {
    this.load.image("sky", "./assets/images/Cielo.png");
  }

  create() {

    this.add.image(400, 300, "sky").setScale(0.555);
    
    this.add.text(250, 250, "GAME OVER", {
      fontSize: "50px",
      fill:"#ffffff",
      fontFamily: "arial",
      fontWeight:"bold",
    });
  }

  update() {}
}