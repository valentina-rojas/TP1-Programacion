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

    this.add.text(235, 200, "¡GANASTE!", {
      fontSize: "60px",
      fill: "#ffffff",
      fontFamily: "roboto",
      fontWeight: "bold",
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: "#000000",
        blur: 5,
        stroke: false,
        fill: true,
      },
    });

    const button = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 + 50,
        "VOLVER AL MENÚ",
        {
          fontFamily: "Arial",
          fontSize: 20,
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

    button.on("pointerover", () => {
      button.setStyle({ backgroundColor: "#888888" });
    });

    button.on("pointerout", () => {
      button.setStyle({ backgroundColor: "#000000" });
    });

    button.on("pointerup", () => {
      this.scene.start("Menu");
    });
  }

  update() {}
}
