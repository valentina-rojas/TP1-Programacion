import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
} from "../utis.js";

export default class extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.shapesRecolected = {
      triangulo: { count: 0, score: 10 },
      cuadrado: { count: 0, score: 20 },
      rombo: { count: 0 },
      score: 30,
    };

    this.isWinner = false;
    this.isGameOver = false;
  }

  preload() {
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("ninja", "./assets/images/Ninja.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    this.ninja = this.physics.add.sprite(100, 500, "ninja");

    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 568, "platform").setScale(2).refreshBody();

    this.shapeGroup = this.physics.add.group();

    this.physics.add.collider(this.ninja, this.platformsGroup);
    this.physics.add.collider(this.shapeGroup, this.platformsGroup);

    this.physics.add.overlap(
      this.ninja,
      this.shapeGroup,
      this.collectShape,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    // evento para agregar formas

    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    // texto en pantalla

    this.scoreText = this.add.text(16, 16, "T: O / C: 0 / R: 0", {
      fontSize: "20px",
      fill: "#1af",
    });
  }

  update() {
    // check if game over or win

    if (this.isWinner) {
      this.scene.start("Winner");
    }

    if (this.isGameOver) {
      this.scene.start("GameOver");
    }

    // movimiento de personaje

    if (this.cursors.left.isDown) {
      this.ninja.setVelocityX(-PLAYER_MOVEMENTS.x);
    } else if (this.cursors.right.isDown) {
      this.ninja.setVelocityX(PLAYER_MOVEMENTS.x);
    } else {
      this.ninja.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.ninja.body.touching.down) {
      this.ninja.setVelocityY(-PLAYER_MOVEMENTS.y);
    }
  }

  collectShape(ninja, shape) {
    console.log("figura recolectada");
    shape.disableBody(true, true);

    const shapeName = shape.texture.key;
    this.shapesRecolected[shapeName].count++;

    //actualizar texto de puntaje
    this.scoreText.setText(
      "T: " +
        this.shapesRecolected[TRIANGULO].count +
        "/ C " +
        this.shapesRecolected[CUADRADO].count +
        "/ R " +
        this.shapesRecolected[ROMBO].count
    );

    console.log(this.shapesRecolected);

    //check if winner
    //two of each shape

    if (
      this.shapesRecolected[TRIANGULO].count >= 2 &&
      this.shapesRecolected[CUADRADO].count >= 2 &&
      this.shapesRecolected[ROMBO].count >= 2
    ) {
      this.isWinner = true;
    }
  }

  addShape() {
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    const randomX = Phaser.Math.Between(0, 800);

    this.shapeGroup.create(randomX, 0, randomShape);

    console.log("shape is added", randomX, randomShape);
  }
}
