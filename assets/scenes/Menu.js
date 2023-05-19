export default class extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  init() {}

  preload() {
    this.load.image("sky", "./assets/images/Cielo.png");
  }

  create() {
    //imagen de fondo
    this.add.image(400, 300, "sky").setScale(0.555);

    //título del juego
    this.add
      .text(400, 200, "NINJA MONCHO", {
        fontFamily: "Arial",
        fontSize: 60,
        color: "#ffffff",
        shadow: {
          offsetX: 3,
          offsetY: 3,
          color: "#000000",
          blur: 5,
          stroke: false,
          fill: true,
        },
      })
      .setOrigin(0.5);

    //botón para empezar el juego
    const button = this.add
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

    // cambiar el color de fondo cuando el puntero se coloca sobre el botón
    button.on("pointerover", () => {
      button.setStyle({ backgroundColor: "#888888" });
    });

    // volver al color de fondo cuando el puntero sale del botón
    button.on("pointerout", () => {
      button.setStyle({ backgroundColor: "#000000" });
    });

    // al presionar el boton llevar a la escena de juego
    button.on("pointerup", () => {
      this.scene.start("game");
    });
  }

  update() {}
}
