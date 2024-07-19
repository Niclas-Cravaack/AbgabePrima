namespace Script {
  import ƒ = FudgeCore;

  export class Ball extends ƒ.Node {
    public velocity: ƒ.Vector3 = new ƒ.Vector3(0.1, 0.1, 0);

    constructor() {
      super("BallPos");
      this.createBall();
    }

    private createBall(): void {
      const mesh: ƒ.MeshSphere = new ƒ.MeshSphere();
      const coat: ƒ.CoatColored = new ƒ.CoatRemissive(ƒ.Color.CSS("white"));
      const material: ƒ.Material = new ƒ.Material("MaterialBall", ƒ.ShaderFlat, coat);

      this.addComponent(new ƒ.ComponentMesh(mesh));
      this.addComponent(new ƒ.ComponentMaterial(material));
      this.addComponent(new ƒ.ComponentTransform());

      let light =new ƒ.ComponentLight(new ƒ.LightPoint(ƒ.Color.CSS("white")));
      light.mtxPivot.translateZ(10);
      light.mtxPivot.scale(new ƒ.Vector3(20,20,20));

      this.addComponent(light);
    }

    public move(): void {
      this.mtxLocal.translate(this.velocity);

      // Kollision mit den Wänden
      if (this.mtxLocal.translation.x > 7 || this.mtxLocal.translation.x < -7) {
        this.velocity.x *= -1;
      }
      if (this.mtxLocal.translation.y > 7) {
        // Verlassen des Spielfelds - Leben verlieren und Ball zurücksetzen
        this.velocity.y *= -1;
      }
      if ( this.mtxLocal.translation.y < -7) {
        // Verlassen des Spielfelds - Leben verlieren und Ball zurücksetzen
        Script.state.loseLife();
        this.reset();
      }
    }

    public checkCollisionWithPaddle(paddle: ƒ.Node): void {

      let posBall: ƒ.Vector3 = this.mtxLocal.translation;
      let posBrick: ƒ.Vector3 = paddle.mtxLocal.translation;

        if (
          Math.abs(posBall.x - posBrick.x) < 1 &&
          Math.abs(posBall.y - posBrick.y) < 0.5
        ) {
          this.velocity.y *= -1; // Richtung umkehren
      return;
    }
  }

    public checkCollisionWithBricks(bricks: ƒ.Node): void {
      for (let brick of bricks.getChildren()) {
        let posBall: ƒ.Vector3 = this.mtxLocal.translation;
        let posBrick: ƒ.Vector3 = brick.mtxLocal.translation;

        if (
          Math.abs(posBall.x - posBrick.x) < 1 &&
          Math.abs(posBall.y - posBrick.y) < 0.5
        ) {
          this.velocity.y *= -1; // Richtung umkehren
          bricks.removeChild(brick); // Brick entfernen
          this.dispatchEvent(new CustomEvent("hitBrick"))
          break;
        }
      }
    }

    public hasLeftField(): boolean {
      return this.mtxLocal.translation.y < -7; // Beispiel: Ball verlässt das Spielfeld unten
    }

    private reset(): void {
      this.mtxLocal.translation = new ƒ.Vector3(0, 0, 0); // Ball zurücksetzen
      this.velocity = new ƒ.Vector3(0.1, 0.1, 0); // Geschwindigkeit zurücksetzen
    }
  }
}