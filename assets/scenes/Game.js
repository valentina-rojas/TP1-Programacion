import {PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO, CIRCULO} from "../utis.js";

export default class  extends Phaser.Scene {


    constructor() {
      super("game");
    }
  
    init() {
        this.shapesRecolected = { 
        "triangulo": {count: 0, score: 10},
        "cuadrado": {count: 0, score: 15},
        "rombo": {count: 0, score: 20},
        "circulo": {count: 0, score: -10}
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
        this.load.image(CUADRADO, "./assets/images/Cuadrado.png")
        this.load.image(CIRCULO, "./assets/images/circulo.png")


       
     
    }
  
    create() {


        this.add.image(400, 300, "sky").setScale(0.555)
        

        this.player = this.physics.add.sprite(100, 500, "player")


        this.plataformasPropias = this.physics.add.staticGroup();
        this.plataformasPropias.create (400, 568, "platform").setScale(2).refreshBody();

        this.plataformasPropias.create (10,400 , "platform")
        this.plataformasPropias.create (900,220 , "platform")
        this.plataformasPropias.create (800,400 , "platform")
        this.plataformasPropias.create (-100,220 , "platform")





        this.shapeGroup = this.physics.add.group();
  


        this.physics.add.collider (this.player, this.plataformasPropias);
        this.physics.add.collider (this.shapeGroup, this.plataformasPropias);
        
        this.physics.add.overlap(this.player, this.shapeGroup, this.collectShape, null,  this );


        this.cursors = this.input.keyboard.createCursorKeys();



        this.time.addEvent ({
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
          fill: "#1af",
        });


        this.timerText = this.add.text(16, 40, "Tiempo: " + this.timer, {
          fontSize: "20px",
          fill: "#1af",
        });

        this.pointsText = this.add.text(16, 70, "Puntaje: " + this.score, {
          fontSize: "20px",
          fill: "#1af",
        });
    }
  
    update() {

      if (this.isWinner) {
        this.scene.start("Winner");
      }
  
      if (this.isGameOver) {
        this.scene.start("GameOver");
      }
  

      if (this.cursors.left.isDown){
        this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
      } else if  (this.cursors.right.isDown) {
        this.player.setVelocityX(PLAYER_MOVEMENTS.x);
      } else {this.player.setVelocityX(0);
      }
      

      if (this.cursors.up.isDown && this.player.body.touching.down) {
         this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
      }
    

//condicion ganar si se recolectan 2 d ecada figura
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
        this.shapesRecolected[shapeName].count++;

        console.log(this.shapesRecolected);
        this.scoreText.setText(
          "T: " +
            this.shapesRecolected[TRIANGULO].count +
            "/ C " +
            this.shapesRecolected[CUADRADO].count +
            "/ R " +
            this.shapesRecolected[ROMBO].count
        );
        
        const shapeScore = this.shapesRecolected[shapeName].score;

        this.score += shapeScore;
      
        this.pointsText.setText("Puntaje: " + this.score);
    }



    addShape () {
   
      const randomShape = Phaser.Math.RND.pick(SHAPES);

      const randomX = Phaser.Math.Between(0, 800);

      this.shapeGroup.create(randomX, 0, randomShape);

      console.log("shape is added", randomX, randomShape);

    }

    timerDown() {
      this.timer = this.timer - 1;

      this.timerText.setText("Tiempo: " + this.timer);
  
      console.log(this.timer);
    }



  }
  