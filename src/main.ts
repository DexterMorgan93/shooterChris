import { Application, Graphics } from "pixi.js";
import { Player } from "./components/player";
import { Projectile } from "./components/projectile";
import { Enemy } from "./components/enemy";

(async () => {
  const app = new Application();

  await app.init({ background: "#1099bb", width: 1024, height: 768 });

  document.body.appendChild(app.canvas);
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  const player = new Player({ app, radius: 30, color: "0xff0000" });
  app.stage.addChild(player);

  const projectiles: Projectile[] = [];
  const enemies: Enemy[] = [];

  function spawnEnemies() {
    setInterval(() => {
      const radius = Math.random() * (30 - 4) + 4;
      let x;
      let y;
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : app.canvas.width + radius;
        y = Math.random() * app.canvas.height;
      } else {
        x = Math.random() * app.canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : app.canvas.height + radius;
      }
      const color = "rgb(255, 160, 122)";
      const angle = Math.atan2(
        app.canvas.height / 2 - y,
        app.canvas.width / 2 - x
      );
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      enemies.push(
        new Enemy({
          app: app,
          posX: x,
          posY: y,
          radius: radius,
          color: color,
          velocity: velocity,
        })
      );
      enemies.forEach((item) => {
        app.stage.addChild(item);
      });
    }, 1000);
  }

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
    enemies.forEach((item) => {
      item.update();
    });
  });

  spawnEnemies();
})();
