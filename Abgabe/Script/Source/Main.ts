namespace Script {
  interface Data{
    cameraDistance: number
  }

  import f = FudgeCore;
  f.Debug.info("Main Program Template running!");
  
  let viewport: f.Viewport;
  let camera: f.ComponentCamera;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  export let data: Data;

  function start(_event: CustomEvent): void {
    camera = new f.ComponentCamera();
    camera.mtxPivot.translate(new f.Vector3(-0.5,1,data.cameraDistance))
    viewport = _event.detail;


    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    f.AudioManager.default.update();
  }
}