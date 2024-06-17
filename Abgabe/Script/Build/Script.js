"use strict";
var Script;
(function (Script) {
    var f = FudgeCore;
    class Ball {
        node;
        velocity = new f.Vector3(0.1, 0.1, 0);
        constructor(graph) {
            this.node = this.createBall();
            graph.addChild(this.node);
        }
        createBall() {
            const node = new f.Node("Ball");
            const mesh = new f.MeshSphere();
            const coat = new f.CoatColored(f.Color.CSS("white"));
            const material = new f.Material("MaterialBall", f.ShaderLit, coat);
            node.addComponent(new f.ComponentMesh(mesh));
            node.addComponent(new f.ComponentMaterial(material));
            node.addComponent(new f.ComponentTransform());
            return node;
        }
        move() {
            this.node.mtxLocal.translate(this.velocity);
            // Einfache Kollisionslogik mit Wänden
            if (this.node.mtxLocal.translation.x > 7 || this.node.mtxLocal.translation.x < -7) {
                this.velocity.x *= -1;
            }
            if (this.node.mtxLocal.translation.y > 7 || this.node.mtxLocal.translation.y < -7) {
                this.velocity.y *= -1;
            }
        }
        checkCollisionWithPaddle(paddle) {
            let posBall = this.node.mtxLocal.translation;
            let posPaddle = paddle.mtxLocal.translation; // Hier wird paddle als f.Node behandelt
            return (posBall.x > posPaddle.x - 1 && posBall.x < posPaddle.x + 1 &&
                posBall.y > posPaddle.y - 0.5 && posBall.y < posPaddle.y + 0.5);
        }
        checkCollisionWithBricks(bricks) {
            for (let brick of bricks.getChildren()) {
                let posBall = this.node.mtxLocal.translation;
                let posBrick = brick.mtxLocal.translation;
                if (Math.abs(posBall.x - posBrick.x) < 1 &&
                    Math.abs(posBall.y - posBrick.y) < 0.5) {
                    return true;
                }
            }
            return false;
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
            const coat = new ƒ.CoatColored(ƒ.Color.CSS("red"));
            const material = new ƒ.Material("MaterialBrick", ƒ.ShaderLit, coat);
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
    class BrickFactory {
        static createBrick() {
            return new Script.Brick();
        }
    }
    Script.BrickFactory = BrickFactory;
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
    var ƒ = FudgeCore;
    class Game {
        viewport;
        ball;
        paddle;
        bricks;
        constructor() {
            document.addEventListener("interactiveViewportStarted", this.start.bind(this));
        }
        async start(event) {
            this.viewport = event.detail;
            this.setupCamera();
            const graph = this.viewport.getBranch();
            this.bricks = new ƒ.Node("Bricks");
            this.ball = new Script.Ball(graph);
            this.paddle = new Script.Paddle(graph);
            this.createBricks(graph);
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update.bind(this));
            ƒ.Loop.start();
        }
        setupCamera() {
            this.viewport.camera.mtxPivot.translateZ(15);
        }
        createBricks(graph) {
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 10; x++) {
                    const brick = Script.BrickFactory.createBrick();
                    brick.mtxLocal.translateX(x - 5);
                    brick.mtxLocal.translateY(6 - y);
                    this.bricks.addChild(brick);
                }
            }
            graph.addChild(this.bricks);
        }
        update() {
            this.ball.move();
            this.paddle.move();
            this.checkCollisions();
            this.viewport.draw();
        }
        checkCollisions() {
            // Collision detection logic between ball, paddle, and bricks
            // Ball and wall collision
            // Ball and paddle collision
            // Ball and brick collision
        }
    }
    Script.Game = Game;
    new Game();
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    f.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        f.Loop.addEventListener("loopFrame" /* f.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        f.AudioManager.default.update();
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    class Paddle {
        node;
        speed = 0.2;
        constructor(graph) {
            this.node = this.createPaddle();
            graph.addChild(this.node);
        }
        createPaddle() {
            const node = new f.Node("Paddle");
            const mesh = new f.MeshQuad();
            const coat = new f.CoatColored(f.Color.CSS("blue"));
            const material = new f.Material("MaterialPaddle", f.ShaderLit, coat);
            node.addComponent(new f.ComponentMesh(mesh));
            node.addComponent(new f.ComponentMaterial(material));
            node.addComponent(new f.ComponentTransform());
            node.mtxLocal.scaleX(2);
            node.mtxLocal.translateY(-6);
            return node;
        }
        move() {
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_LEFT, f.KEYBOARD_CODE.A])) {
                this.node.mtxLocal.translateX(-this.speed);
            }
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_RIGHT, f.KEYBOARD_CODE.D])) {
                this.node.mtxLocal.translateX(this.speed);
            }
        }
    }
    Script.Paddle = Paddle;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map