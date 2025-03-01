import { Application } from "pixi.js";
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
  player.position.set(app.canvas.width / 2, app.canvas.height / 2);
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

      const enemy = new Enemy({
        app: app,
        radius: radius,
        color: color,
        velocity: velocity,
      });
      enemy.pivot.set(0.5, 0.5);
      enemy.position.set(x, y);

      enemies.push(enemy);
    }, 1000);
  }

  app.ticker.add(() => {
    projectiles.forEach((projectile, projectileIdx) => {
      app.stage.addChild(projectile);
      projectile.update();

      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > app.canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y + projectile.radius > app.canvas.height
      ) {
        app.stage.removeChild(projectile);
        // Удаляем объект из массива
        projectiles.splice(projectileIdx, 1);
      }
    });
    enemies.forEach((item, itemIndex) => {
      app.stage.addChild(item);
      item.update();

      if (
        item.x + item.radius < 0 ||
        item.x - item.radius > app.canvas.width ||
        item.y + item.radius < 0 ||
        item.y + item.radius > app.canvas.height
      ) {
        app.stage.removeChild(item);
        // Удаляем объект из массива
        projectiles.splice(itemIndex, 1);
      }

      const distance = Math.hypot(player.x - item.x, player.y - item.y);

      // end game
      if (distance - item.radius - player.radius < 0) {
        app.ticker.stop();
      }

      projectiles.forEach((proj, projIndex) => {
        const distance = Math.hypot(proj.x - item.x, proj.y - item.y);

        if (distance - item.radius - proj.radius < 0) {
          // Удаляем объект с `stage`
          app.stage.removeChild(item);
          app.stage.removeChild(proj);

          // Удаляем объект из массива
          enemies.splice(itemIndex, 1);
          projectiles.splice(projIndex, 1);
        }
      });
    });
  });

  app.stage.on("pointerdown", (event) => {
    const angle = Math.atan2(
      event.globalY - app.canvas.height / 2,
      event.globalX - app.canvas.width / 2
    );
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    const projectile = new Projectile({
      app: app,
      radius: 9,
      color: "0xea98f4",
      velocity: velocity,
    });
    projectile.pivot.set(0.5, 0.5);
    projectile.position.set(app.canvas.width / 2, app.canvas.height / 2);
    projectiles.push(projectile);
  });

  spawnEnemies();
})();
