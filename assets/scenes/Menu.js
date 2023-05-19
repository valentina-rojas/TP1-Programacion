export default class extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  init() {}

  preload() {
    this.load.image("sky", "./assets/images/Cielo.png");
  }

  create() {

    
    this.add.image(400, 300, "sky").setScale(0.555);
    // Agregar título del juego
    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 - 50,
        "NINJA MONCHO",
        {
          fontFamily: "Arial",
          fontSize: 48,
          color: "#ffffff",
        }
      )
      .setOrigin(0.5);

    // Agregar botón para comenzar el juego
    const playButton = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 + 50,
        "JUGAR",
        {
          fontFamily: "Arial",
          fontSize: 24,
          color: "#ffffff",
          backgroundColor: "#000000",
          padding: {
            x: 16,
            y: 8,
          },
        }
      )
      .setOrigin(0.5)
      .setInteractive();

    // Agregar evento al botón para ir a la escena del juego

    playButton.on("pointerup", () => {
      this.scene.start("Game");
    });
  }

  update() {}
}
