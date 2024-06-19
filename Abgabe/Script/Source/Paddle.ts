namespace Script {
  
  import f = FudgeCore;
  
  export class Paddle extends f.Node {
    public node: f.Node;
    private speed: number = 0.2;

    constructor() {
      super("PaddlePos");
      this.node = this.createPaddle();
      
    }

    private createPaddle(): f.Node {
      const node: f.Node = new f.Node("Paddle");

      const mesh: f.MeshQuad = new f.MeshQuad();
      const coat: f.CoatColored = new f.CoatColored(f.Color.CSS("blue"));
      const material: f.Material = new f.Material("MaterialPaddle", f.ShaderLit, coat);

      node.addComponent(new f.ComponentMesh(mesh));
      node.addComponent(new f.ComponentMaterial(material));
      node.addComponent(new f.ComponentTransform());

      node.mtxLocal.scaleX(2);
      node.mtxLocal.translateY(-6);

      return node;
    }

    public move(): void {
      if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_LEFT, f.KEYBOARD_CODE.A])) {
        this.node.mtxLocal.translateX(-this.speed);
      }
      if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_RIGHT, f.KEYBOARD_CODE.D])) {
        this.node.mtxLocal.translateX(this.speed);
      }
    }
  }
}