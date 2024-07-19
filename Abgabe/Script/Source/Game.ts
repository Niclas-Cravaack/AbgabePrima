namespace Script {
  import f = FudgeCore;
  import fui = FudgeUserInterface;

  export class Game extends ƒ.Mutable {
    public controller: fui.Controller;

    

    public stateMachine: GameState;

    private highscore:number;
    private lives: number;

    constructor() {
      super();
      this.controller = new fui.Controller(this, document.querySelector("#gameInfo"));
      this.highscore = data.highscore;
      this.lives = data.lives;
      console.log(this.controller);
      
    }
    
      /**
       * setHeight
       */
      public setHighscore(_highscore: number): void {
        // console.log("set height to " + _height);
        
        this.highscore = _highscore;
      }

      public loseLife(): void{
        this.lives--;
        if (this.lives<=0){
            this.stateMachine = GameState.GameOver;
            f.Loop.stop();
        }

      }

      public increaseHighscore(x: number): void{
        this.highscore+=x;
      }

    protected reduceMutator(_mutator: ƒ.Mutator): void {/* */ }

  }



}