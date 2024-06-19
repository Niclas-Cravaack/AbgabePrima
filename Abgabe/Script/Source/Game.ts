namespace Script {
  import ƒ = FudgeCore;

  export class Game {
    private viewport: ƒ.Viewport;
    private ball: Ball;
    private paddle: Paddle;
    private bricks: ƒ.Node;

    constructor() {
      document.addEventListener("interactiveViewportStarted", this.start.bind(this));
    }

    private async start(event: CustomEvent): Promise<void> {
      this.viewport = event.detail;
      this.setupCamera();

      const graph: ƒ.Node = this.viewport.getBranch();
      this.bricks = new ƒ.Node("Bricks");

      this.ball = new Ball(graph);
      this.paddle = new Paddle();
      this.createBricks(graph);
      graph.addChild(this.paddle);
     

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
      ƒ.Loop.start();
    }

    private setupCamera(): void {
      this.viewport.camera.mtxPivot.translateZ(-15);
    }

    private createBricks(graph: ƒ.Node): void {
      for (let y: number = 0; y < 5; y++) {
        for (let x: number = 0; x < 10; x++) {
          const brick: Brick = BrickFactory.createBrick();
          brick.mtxLocal.translateX(x - 5);
          brick.mtxLocal.translateY(6 - y);
          this.bricks.addChild(brick);
        }
      }
      graph.addChild(this.bricks);
    }

    private update(): void {
      this.ball.move();
      this.paddle.move();

      this.checkCollisions();

      this.viewport.draw();
    }

    private checkCollisions(): void {
      // Collision detection logic between ball, paddle, and bricks
      // Ball and wall collision
      // Ball and paddle collision
      // Ball and brick collision
    }
  }

  new Game();
}