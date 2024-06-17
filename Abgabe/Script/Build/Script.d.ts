declare namespace Script {
    import f = FudgeCore;
    class Ball {
        node: f.Node;
        velocity: f.Vector3;
        constructor(graph: f.Node);
        private createBall;
        move(): void;
        checkCollisionWithPaddle(paddle: f.Node): boolean;
        checkCollisionWithBricks(bricks: f.Node): boolean;
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
    class BrickFactory {
        static createBrick(): Brick;
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
    class Game {
        private viewport;
        private ball;
        private paddle;
        private bricks;
        constructor();
        private start;
        private setupCamera;
        private createBricks;
        private update;
        private checkCollisions;
    }
}
declare namespace Script {
}
declare namespace Script {
    import f = FudgeCore;
    class Paddle {
        node: f.Node;
        private speed;
        constructor(graph: f.Node);
        private createPaddle;
        move(): void;
    }
}
