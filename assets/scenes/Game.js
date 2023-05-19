import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
  CIRCULO,
  POINTS_PERCENTAGE,
  POINTS_PERCENTAGE_VALUE_START,
} from "../utis.js";

export default class extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.shapesRecolected = {
      triangulo: { count: 0, score: 10 },
      cuadrado: { count: 0, score: 15 },
      rombo: { count: 0, score: 20 },
      circulo: { count: 0, score: -10 },
    };

    this.isWinner = false;
    this.isGameOver = false;

    this.timer = 30;

    this.score = 0;
  }

  preload() {
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
    this.load.image(CIRCULO, "./assets/images/circulo.png");
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    this.player = this.physics.add.sprite(100, 500, "player");

    this.plataformasPropias = this.physics.add.staticGroup();

    this.plataformasPropias
      .create(400, 568, "platform")
      .setScale(2)
      .refreshBody();

    this.plataformasPropias.create(10, 400, "platform");
 
    this.plataformasPropias.create(800, 400, "platform");
    

    this.shapeGroup = this.physics.add.group();

    //colisión objeto y jugador
    this.physics.add.collider(this.player, this.plataformasPropias);

    //colisión objeto y plaatformas
    this.physics.add.collider(this.shapeGroup, this.plataformasPropias);

    this.physics.add.overlap(
      this.shapeGroup,
      this.plataformasPropias,
      this.reduce,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.shapeGroup,
      this.collectShape,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.timerDown,
      callbackScope: this,
      loop: true,
    });

    this.scoreText = this.add.text(16, 16, "T: 0 / C: 0 / R: 0", {
      fontSize: "20px",
      fill:"#ffffff",
      fontFamily: "arial",
      fontWeight:"bold",
    });

    this.timerText = this.add.text(16, 40, "Tiempo: " + this.timer, {
      fontSize: "20px",
      fill:"#ffffff",
      fontFamily: "arial",
      fontWeight:"bold",
    });

    this.pointsText = this.add.text(16, 70, "Puntaje: " + this.score, {
      fontSize: "20px",
      fill:"#ffffff",
      fontFamily: "arial",
      fontWeight:"bold",
    });
  }

  update() {
    
    if (this.isWinner) {
      this.scene.start("Winner");
    }

    if (this.isGameOver) {
      this.scene.start("GameOver");
    }

    // movimiento de personaje
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_MOVEMENTS.x);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
    }

    //condicion ganar si se recolectan 2 de cada figura
    if (
      this.shapesRecolected[TRIANGULO].count >= 2 &&
      this.shapesRecolected[CUADRADO].count >= 2 &&
      this.shapesRecolected[ROMBO].count >= 2
    ) {
      this.isWinner = true;
    }

    // condicion ganar si supera 100 puntos
    if (this.score >= 100) {
      this.isWinner = true;
    }

    //condicion perder si timer llega a 0
    if (this.timer <= 0) {
      this.isGameOver = true;
    }
  }

  collectShape(player, shape) {
    console.log("figura recolectada");
    shape.disableBody(true, true);

    const shapeName = shape.texture.key;
    const percentage = shape.getData(POINTS_PERCENTAGE);

    const scoreNow = this.shapesRecolected[shapeName].score * percentage;
    this.score += scoreNow;

    this.shapesRecolected[shapeName].count++;

    console.log(this.shapesRecolected);
    this.scoreText.setText(
      "T: " +
        this.shapesRecolected[TRIANGULO].count +
        "/ C: " +
        this.shapesRecolected[CUADRADO].count +
        "/ R: " +
        this.shapesRecolected[ROMBO].count
    );

    this.pointsText.setText(`Score: ${this.score.toString()}`);
  }

  addShape() {
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    const randomX = Phaser.Math.Between(0, 800);

    this.shapeGroup
      .create(randomX, 0, randomShape)
      .setCircle(32, 0, 0)
      .setBounce(0.8)
      .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);

    console.log("shape is added", randomX, randomShape);
  }

  reduce(shape, platform) {
    const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.25;
    console.log(shape.texture.key, newPercentage);
    shape.setData(POINTS_PERCENTAGE, newPercentage);
    if (newPercentage <= 0) {
      shape.disableBody(true, true);
      return;
    }
  }

  timerDown() {
    this.timer = this.timer - 1;

    this.timerText.setText("Tiempo: " + this.timer);

    console.log(this.timer);
  }
}
