namespace Script {
    export enum GameState {
      Running,
      GameOver
    }
  
    export class StateMachine {
      private currentState: GameState;
  
      constructor() {
        this.currentState = GameState.Running;
      }
  
      public setState(state: GameState): void {
        this.currentState = state;
      }
  
      public getState(): GameState {
        return this.currentState;
      }
    }
  }