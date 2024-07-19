namespace Script {
  
  import f = FudgeCore;
  
  export class Paddle extends f.Node {
   

    constructor() {
      super("PaddlePos");
      this.createPaddle();
      
    }

    private createPaddle(): void {

      const mesh: f.MeshQuad = new f.MeshQuad();
      const coat: f.CoatColored = new f.CoatRemissive(f.Color.CSS("blue"));
      const material: f.Material = new f.Material("MaterialPaddle", f.ShaderFlat, coat);

      this.addComponent(new f.ComponentMesh(mesh));
      this.addComponent(new f.ComponentMaterial(material));
      this.addComponent(new f.ComponentTransform());

      this.mtxLocal.scaleX(2);
      this.mtxLocal.translateY(-6);

    }

  }
}