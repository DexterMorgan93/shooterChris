import { Application } from "pixi.js";
import { Player } from "./components/player";

(async () => {
  const app = new Application();

  await app.init({ background: "#1099bb", width: 1024, height: 768 });

  document.body.appendChild(app.canvas);

  const player = new Player({ app, radius: 50, color: "0xff0000" });
  app.stage.addChild(player);
})();
