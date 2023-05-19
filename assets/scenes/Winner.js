export default class extends Phaser.Scene {
    constructor() {
      super("Winner");
    }
  
    init() {}
  
    preload() {
      this.load.image("sky", "./assets/images/Cielo.png");
    }
  
    create() {

      this.add.image(400, 300, "sky").setScale(0.555);
      
      this.add.text(300, 300, "WINNER", {
        fontSize: "50px",
        fill:"#ffffff",
        fontFamily: "arial",
        fontWeight:"bold",
      });
    }
  
    update() {}
  }