import { Application, Graphics } from "pixi.js";
import { Player } from "./components/player";
import { Projectile } from "./components/projectile";

(async () => {
  const app = new Application();

  await app.init({ background: "#1099bb", width: 1024, height: 768 });

  document.body.appendChild(app.canvas);
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  const player = new Player({ app, radius: 30, color: "0xff0000" });

  app.stage.addChild(player);

  app.stage.on("pointerdown", (event) => {
    const projectile = new Projectile({
      app: app,
      posX: event.global.x,
      posY: event.global.y,
      radius: 5,
      color: "0xea98f4",
      velocity: { x: 0, y: 0 },
    });
    app.stage.addChild(projectile);
    projectile.draw();
  });
})();
