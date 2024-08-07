namespace Script {


  interface Data{
    cameraDistance: number
    highscore:number;
    lives: number; 
  }

  import f = FudgeCore;
  f.Debug.info("Main Program Template running!");
  
  let viewport: f.Viewport;
  
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);


  let camera: f.ComponentCamera;
  let stateMachine: GameState;
  let ball: Ball;
  let paddle: Paddle;
  let bricks: f.Node;
  let paddleMovement: PaddleMovementComponent;

  
  
  export let state: Game;
  export let data: Data;
  async function start(_event: CustomEvent): Promise<void> {
    data= await(await fetch("Script/Source/Data.JSON")).json() ;
    viewport= _event.detail;
    
    camera = viewport.camera;
    camera.mtxPivot.translate(new f.Vector3(0,0,data.cameraDistance))

    bricks = new f.Node("Bricks");

    ball = new Ball();
    ball.addEventListener("hitBrick", increaseHighscore);
    paddle = new Paddle();
    paddleMovement = new PaddleMovementComponent();
    paddle.addComponent(paddleMovement);
    
    let graph: f.Node = viewport.getBranch();


    graph.addChild(paddle);

    graph.addChild(ball);
    
    createBricks(graph);

    let cmpAudio: f.ComponentAudio = graph.getComponent(f.ComponentAudio);

    let backgroundMusic: f.Audio = new f.Audio();
    await backgroundMusic.load("Script/Source/Audio/background.mp3");

    cmpAudio = new f.ComponentAudio(backgroundMusic, true,true)

    graph.addComponent(cmpAudio);

    stateMachine = GameState.Running;

    state = new Game();


    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function increaseHighscore(){
    Script.state.increaseHighscore(10); // Highscore erhöhen
  }
  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    
    paddleMovement.update();
    ball.move();
    ball.checkCollisionWithBricks(bricks);
    ball.checkCollisionWithPaddle(paddle);
    
    if (ball.hasLeftField()) {
    state.loseLife();
    }
    
    viewport.draw();
    
      
    f.AudioManager.default.update();
  }

  function createBricks(graph: f.Node): void {
    for (let y: number = 0; y < 5; y++) {
      for (let x: number = 0; x < 10; x++) {
        const brick = new Brick();

        brick.mtxLocal.translateX(x - 5);
        brick.mtxLocal.translateY(6 - y);
        bricks.addChild(brick);
      }
    }
    graph.addChild(bricks);
    
  }
}