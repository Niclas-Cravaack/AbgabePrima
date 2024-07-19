"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Ball extends ƒ.Node {
        velocity = new ƒ.Vector3(0.1, 0.1, 0);
        constructor() {
            super("BallPos");
            this.createBall();
        }
        createBall() {
            const mesh = new ƒ.MeshSphere();
            const coat = new ƒ.CoatRemissive(ƒ.Color.CSS("white"));
            const material = new ƒ.Material("MaterialBall", ƒ.ShaderFlat, coat);
            this.addComponent(new ƒ.ComponentMesh(mesh));
            this.addComponent(new ƒ.ComponentMaterial(material));
            this.addComponent(new ƒ.ComponentTransform());
            let light = new ƒ.ComponentLight(new ƒ.LightPoint(ƒ.Color.CSS("white")));
            light.mtxPivot.translateZ(10);
            light.mtxPivot.scale(new ƒ.Vector3(20, 20, 20));
            this.addComponent(light);
        }
        move() {
            this.mtxLocal.translate(this.velocity);
            // Kollision mit den Wänden
            if (this.mtxLocal.translation.x > 7 || this.mtxLocal.translation.x < -7) {
                this.velocity.x *= -1;
            }
            if (this.mtxLocal.translation.y > 7) {
                // Verlassen des Spielfelds - Leben verlieren und Ball zurücksetzen
                this.velocity.y *= -1;
            }
            if (this.mtxLocal.translation.y < -7) {
                // Verlassen des Spielfelds - Leben verlieren und Ball zurücksetzen
                Script.state.loseLife();
                this.reset();
            }
        }
        checkCollisionWithPaddle(paddle) {
            let posBall = this.mtxLocal.translation;
            let posBrick = paddle.mtxLocal.translation;
            if (Math.abs(posBall.x - posBrick.x) < 1 &&
                Math.abs(posBall.y - posBrick.y) < 0.5) {
                this.velocity.y *= -1; // Richtung umkehren
                return;
            }
        }
        checkCollisionWithBricks(bricks) {
            for (let brick of bricks.getChildren()) {
                let posBall = this.mtxLocal.translation;
                let posBrick = brick.mtxLocal.translation;
                if (Math.abs(posBall.x - posBrick.x) < 1 &&
                    Math.abs(posBall.y - posBrick.y) < 0.5) {
                    this.velocity.y *= -1; // Richtung umkehren
                    bricks.removeChild(brick); // Brick entfernen
                    this.dispatchEvent(new CustomEvent("hitBrick"));
                    break;
                }
            }
        }
        hasLeftField() {
            return this.mtxLocal.translation.y < -7; // Beispiel: Ball verlässt das Spielfeld unten
        }
        reset() {
            this.mtxLocal.translation = new ƒ.Vector3(0, 0, 0); // Ball zurücksetzen
            this.velocity = new ƒ.Vector3(0.1, 0.1, 0); // Geschwindigkeit zurücksetzen
        }
    }
    Script.Ball = Ball;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Brick extends ƒ.Node {
        constructor() {
            super("Brick");
            this.init();
        }
        init() {
            const mesh = new ƒ.MeshQuad();
            const coat = new ƒ.CoatRemissive(ƒ.Color.CSS("red"));
            const material = new ƒ.Material("MaterialBrick", ƒ.ShaderFlat, coat);
            this.addComponent(new ƒ.ComponentMesh(mesh));
            this.addComponent(new ƒ.ComponentMaterial(material));
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.scale(new ƒ.Vector3(1, 0.5, 1));
        }
    }
    Script.Brick = Brick;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    var fui = FudgeUserInterface;
    class Game extends ƒ.Mutable {
        controller;
        stateMachine;
        highscore;
        lives;
        constructor() {
            super();
            this.controller = new fui.Controller(this, document.querySelector("#gameInfo"));
            this.highscore = Script.data.highscore;
            this.lives = Script.data.lives;
            console.log(this.controller);
        }
        /**
         * setHeight
         */
        setHighscore(_highscore) {
            // console.log("set height to " + _height);
            this.highscore = _highscore;
        }
        loseLife() {
            this.lives--;
            if (this.lives <= 0) {
                this.stateMachine = Script.GameState.GameOver;
                f.Loop.stop();
            }
        }
        increaseHighscore(x) {
            this.highscore += x;
        }
        reduceMutator(_mutator) { }
    }
    Script.Game = Game;
})(Script || (Script = {}));
var Script;
(function (Script) {
    let GameState;
    (function (GameState) {
        GameState[GameState["Running"] = 0] = "Running";
        GameState[GameState["GameOver"] = 1] = "GameOver";
    })(GameState = Script.GameState || (Script.GameState = {}));
    class StateMachine {
        currentState;
        constructor() {
            this.currentState = GameState.Running;
        }
        setState(state) {
            this.currentState = state;
        }
        getState() {
            return this.currentState;
        }
    }
    Script.StateMachine = StateMachine;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    f.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let camera;
    let stateMachine;
    let ball;
    let paddle;
    let bricks;
    let paddleMovement;
    async function start(_event) {
        Script.data = await (await fetch("Script/Source/Data.JSON")).json();
        viewport = _event.detail;
        camera = viewport.camera;
        camera.mtxPivot.translate(new f.Vector3(0, 0, Script.data.cameraDistance));
        bricks = new f.Node("Bricks");
        ball = new Script.Ball();
        ball.addEventListener("hitBrick", increaseHighscore);
        paddle = new Script.Paddle();
        paddleMovement = new Script.PaddleMovementComponent();
        paddle.addComponent(paddleMovement);
        let graph = viewport.getBranch();
        graph.addChild(paddle);
        graph.addChild(ball);
        createBricks(graph);
        let cmpAudio = graph.getComponent(f.ComponentAudio);
        let backgroundMusic = new f.Audio();
        await backgroundMusic.load("Script/Source/Audio/background.mp3");
        cmpAudio = new f.ComponentAudio(backgroundMusic, true, true);
        graph.addComponent(cmpAudio);
        stateMachine = Script.GameState.Running;
        Script.state = new Script.Game();
        f.Loop.addEventListener("loopFrame" /* f.EVENT.LOOP_FRAME */, update);
        f.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function increaseHighscore() {
        Script.state.increaseHighscore(10); // Highscore erhöhen
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        paddleMovement.update();
        ball.move();
        ball.checkCollisionWithBricks(bricks);
        ball.checkCollisionWithPaddle(paddle);
        if (ball.hasLeftField()) {
            Script.state.loseLife();
        }
        viewport.draw();
        f.AudioManager.default.update();
    }
    function createBricks(graph) {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 10; x++) {
                const brick = new Script.Brick();
                brick.mtxLocal.translateX(x - 5);
                brick.mtxLocal.translateY(6 - y);
                bricks.addChild(brick);
            }
        }
        graph.addChild(bricks);
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    class Paddle extends f.Node {
        constructor() {
            super("PaddlePos");
            this.createPaddle();
        }
        createPaddle() {
            const mesh = new f.MeshQuad();
            const coat = new f.CoatRemissive(f.Color.CSS("blue"));
            const material = new f.Material("MaterialPaddle", f.ShaderFlat, coat);
            this.addComponent(new f.ComponentMesh(mesh));
            this.addComponent(new f.ComponentMaterial(material));
            this.addComponent(new f.ComponentTransform());
            this.mtxLocal.scaleX(2);
            this.mtxLocal.translateY(-6);
        }
    }
    Script.Paddle = Paddle;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    class PaddleMovementComponent extends f.ComponentScript {
        static iSubclass = f.Component.registerSubclass(PaddleMovementComponent);
        speed = 0.2;
        update() {
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_LEFT, f.KEYBOARD_CODE.A])) {
                this.node.mtxLocal.translateX(-this.speed);
            }
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_RIGHT, f.KEYBOARD_CODE.D])) {
                this.node.mtxLocal.translateX(this.speed);
            }
        }
    }
    Script.PaddleMovementComponent = PaddleMovementComponent;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map