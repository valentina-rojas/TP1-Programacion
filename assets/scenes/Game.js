export default class  extends Phaser.Scene {


    constructor() {
      super("game");
    }
  
    init() {
        let shapesRecolected = [
        { type: "Triangulo", count: 0},
        { type: "Cuadrado", count: 0},
        { type: "Rombo", count: 0}, 
      ];
    }
  

    preload() {
        this.load.image("sky", "./assets/images/Cielo.png");
        this.load.image("platform", "./assets/images/platform.png");
        this.load.image("ninja", "./assets/images/Ninja.png");
        this.load.image("triangle", "./assets/images/Triangulo.png");

       
     
    }
  
    create() {


        this.add.image(400, 300, "sky").setScale(0.555)
        

        this.ninja = this.physics.add.sprite(100, 500, "ninja")


        this.plataformasPropias = this.physics.add.staticGroup();
        this.plataformasPropias
        .create (400, 568, "platform")
        .setScale(2)
        .refreshBody();



        this.shapeGroup = this.physics.add.group();
        this.shapeGroup.create(100, 0, "triangle");

        this.physics.add.collider (this.ninja, this.plataformasPropias);
        this.physics.add.collider (this.shapeGroup, this.plataformasPropias);
        
        this.physics.add.overlap(
            this.ninja, 
            this.shapeGroup, 
            this.collectShape,
            null, 
            this
        );


    }
  
    update() {
    
    }



    collectShape(ninja, shape) {
        console.log("figura recolectada");
        shape.disableBody(true, true);


    }

  }
  