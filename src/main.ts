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

  const projectiles: Projectile[] = [];

  app.stage.on("pointerdown", (event) => {
    const angle = Math.atan2(
      event.globalY - app.canvas.height / 2,
      event.globalX - app.canvas.width / 2
    );
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    projectiles.push(
      new Projectile({
        app: app,
        posX: app.canvas.width / 2,
        posY: app.canvas.height / 2,
        radius: 9,
        color: "0xea98f4",
        velocity: velocity,
      })
    );
  });

  app.ticker.add(() => {
    projectiles.forEach((projectile) => {
      projectile.update();
      // if (projectile.position.x > app.canvas.height / 2) {
      //   projectile.delete();
      // }

      app.stage.addChild(projectile);
    });
  });
})();
