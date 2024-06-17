namespace Script {
  import ƒ = FudgeCore;

  export class Brick extends ƒ.Node {
    constructor() {
      super("Brick");
      this.init();
    }

    private init(): void {
      const mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
      const coat: ƒ.CoatColored = new ƒ.CoatColored(ƒ.Color.CSS("red"));
      const material: ƒ.Material = new ƒ.Material("MaterialBrick", ƒ.ShaderLit, coat);

      this.addComponent(new ƒ.ComponentMesh(mesh));
      this.addComponent(new ƒ.ComponentMaterial(material));
      this.addComponent(new ƒ.ComponentTransform());

      this.mtxLocal.scale(new ƒ.Vector3(1, 0.5, 1));
    }
  }
}