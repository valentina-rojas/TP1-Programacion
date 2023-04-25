import {PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO} from "../utis.js";

export default class  extends Phaser.Scene {


    constructor() {
      super("game");
    }
  
    init() {
        this.shapesRecolected = { 
        "triangulo": {count: 0, score: 10},
        "cuadrado": {count: 0, score: 20},
        "rombo": {count: 0}, score: 30,
      };
    }
  

    preload() {
        this.load.image("sky", "./assets/images/Cielo.png");
        this.load.image("platform", "./assets/images/platform.png");
        this.load.image("ninja", "./assets/images/Ninja.png");
        this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
        this.load.image(ROMBO, "./assets/images/Rombo.png");
        this.load.image(CUADRADO, "./assets/images/Cuadrado.png")


       
     
    }
  
    create() {


        this.add.image(400, 300, "sky").setScale(0.555)
        

        this.ninja = this.physics.add.sprite(100, 500, "ninja")


        this.plataformasPropias = this.physics.add.staticGroup();
        this.plataformasPropias.create (400, 568, "platform").setScale(2).refreshBody();



        this.shapeGroup = this.physics.add.group();
  


        this.physics.add.collider (this.ninja, this.plataformasPropias);
        this.physics.add.collider (this.shapeGroup, this.plataformasPropias);
        
        this.physics.add.overlap(this.ninja, this.shapeGroup, this.collectShape, null,  this );


        this.cursors = this.input.keyboard.createCursorKeys();



        this.time.addEvent ({
          delay: SHAPE_DELAY,
          callback: this.addShape,
          callbackScope: this,
          loop: true,

        });
    }
  
    update() {

      if (this.cursors.left.isDown){
        this.ninja.setVelocityX(-PLAYER_MOVEMENTS.x);
      } else if  (this.cursors.right.isDown) {
        this.ninja.setVelocityX(PLAYER_MOVEMENTS.x);
      } else {this.ninja.setVelocityX(0);
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

        console.log(this.shapesRecolected);


        
    }



    addShape () {
   
      const randomShape = Phaser.Math.RND.pick(SHAPES);

      const randomX = Phaser.Math.Between(0, 800);

      this.shapeGroup.create(randomX, 0, randomShape);

      console.log("shape is added", randomX, randomShape);

    }


   

  }
  