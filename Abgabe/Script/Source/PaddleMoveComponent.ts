namespace Script{
    import f  = FudgeCore;

    export class PaddleMovementComponent extends f.ComponentScript{
        public static readonly iSubclass: number = f.Component.registerSubclass(PaddleMovementComponent)
        
        
        public speed: number = 0.2;
        

      
        public update(): void {
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_LEFT, f.KEYBOARD_CODE.A])) {
              this.node.mtxLocal.translateX(-this.speed);
            }
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_RIGHT, f.KEYBOARD_CODE.D])) {
              this.node.mtxLocal.translateX(this.speed);
            }
        }
    }
}
        
      

    