declare namespace Script {
    import ƒ = FudgeCore;
    class Ball extends ƒ.Node {
        velocity: ƒ.Vector3;
        constructor();
        private createBall;
        move(): void;
        checkCollisionWithPaddle(paddle: ƒ.Node): void;
        checkCollisionWithBricks(bricks: ƒ.Node): void;
        hasLeftField(): boolean;
        private reset;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Brick extends ƒ.Node {
        constructor();
        private init;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import fui = FudgeUserInterface;
    class Game extends ƒ.Mutable {
        controller: fui.Controller;
        stateMachine: GameState;
        private highscore;
        private lives;
        constructor();
        /**
         * setHeight
         */
        setHighscore(_highscore: number): void;
        loseLife(): void;
        increaseHighscore(x: number): void;
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
    enum GameState {
        Running = 0,
        GameOver = 1
    }
    class StateMachine {
        private currentState;
        constructor();
        setState(state: GameState): void;
        getState(): GameState;
    }
}
declare namespace Script {
    interface Data {
        cameraDistance: number;
        highscore: number;
        lives: number;
    }
    export let state: Game;
    export let data: Data;
    export {};
}
declare namespace Script {
    import f = FudgeCore;
    class Paddle extends f.Node {
        constructor();
        private createPaddle;
    }
}
declare namespace Script {
    import f = FudgeCore;
    class PaddleMovementComponent extends f.ComponentScript {
        static readonly iSubclass: number;
        speed: number;
        update(): void;
    }
}
