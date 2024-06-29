namespace Script {
  interface Data{
    cameraDistance: number
  }

  import f = FudgeCore;
  f.Debug.info("Main Program Template running!");
  
  let viewport: f.Viewport;
  
  document.addEventListener("interactiveViewportStarted", <EventListener>start);


  let camera: f.ComponentCamera;
  let ball: Ball;
  let paddle: Paddle;
  let bricks: f.Node;
  let paddleMovement: PaddleMovementComponent;

  export let graph: f.Node = viewport.getBranch();

  export let state: Game;
  export let data: Data;

  function start(_event: CustomEvent): void {
    viewport= _event.detail;

    camera = viewport.camera;
    camera.mtxPivot.translate(new f.Vector3(0,0,data.cameraDistance))

    bricks = new f.Node("Bricks");

    ball = new Ball();
    paddle = new Paddle();
    paddleMovement = paddle.getComponent(PaddleMovementComponent)

    this.createBricks(graph);

    graph.addChild(paddle);
    graph.addChild(ball);
    
    createBricks(graph);

    state = new Game();

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  
  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    
    this.paddle.move();
    this.ball.move();
    this.ball.checkCollisionWithBricks(bricks);
    this.ball.checkCollisionWithPaddle(paddle);
    
    viewport.draw();
    
      
    f.AudioManager.default.update();
  }

  function createBricks(graph: f.Node): void {
    for (let y: number = 0; y < 5; y++) {
      for (let x: number = 0; x < 10; x++) {
        const brick: Brick = BrickFactory.createBrick();
        brick.mtxLocal.translateX(x - 5);
        brick.mtxLocal.translateY(6 - y);
        bricks.addChild(brick);
      }
    }
    graph.addChild(this.bricks);
    
  }
}