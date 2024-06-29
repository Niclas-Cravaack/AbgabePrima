namespace Script {
  import f = FudgeCore;

  export class Ball extends f.Node {
    public node: f.Node;
    public velocity: f.Vector3 = new f.Vector3(0.1, 0.1, 0);

    constructor() {
      super("BallPos")
      this.node = this.createBall();
      
    }

    private createBall(): f.Node {
      const node: f.Node = new f.Node("Ball");

      const mesh: f.MeshSphere = new f.MeshSphere();
      const coat: f.CoatColored = new f.CoatColored(f.Color.CSS("white"));
      const material: f.Material = new f.Material("MaterialBall", f.ShaderLit, coat);

      node.addComponent(new f.ComponentMesh(mesh));
      node.addComponent(new f.ComponentMaterial(material));
      node.addComponent(new f.ComponentTransform());

      return node;
    }

    public move(): void {
      this.node.mtxLocal.translate(this.velocity);

      // Einfache Kollisionslogik mit Wänden
      if (this.node.mtxLocal.translation.x > 7 || this.node.mtxLocal.translation.x < -7) {
        this.velocity.x *= -1;
      }
      if (this.node.mtxLocal.translation.y > 7 || this.node.mtxLocal.translation.y < -7) {
        this.velocity.y *= -1;
      }
    }

    public checkCollisionWithPaddle(paddle: Paddle): void {
      let posBall: f.Vector3 = this.mtxLocal.translation;
      let posPaddle: f.Vector3 = paddle.mtxLocal.translation;

      if (
        posBall.x > posPaddle.x - 1 && posBall.x < posPaddle.x + 1 &&
        posBall.y > posPaddle.y - 0.5 && posBall.y < posPaddle.y + 0.5
      ) {
        this.velocity.y *= -1; // Ändere die y-Richtung bei Kollision mit dem Paddle
      }
    }

    public checkCollisionWithBricks(bricks: f.Node): void {
      for (let brick of bricks.getChildren()) {
        let posBall: f.Vector3 = this.mtxLocal.translation;
        let posBrick: f.Vector3 = brick.mtxLocal.translation;

        if (
          Math.abs(posBall.x - posBrick.x) < 1 && 
          Math.abs(posBall.y - posBrick.y) < 0.5
        ) {
          this.velocity.y *= -1; // Ändere die y-Richtung bei Kollision mit einem Brick
          bricks.removeChild(brick); // Entferne den getroffenen Brick
          break;
        }
      }
    }
  }
}