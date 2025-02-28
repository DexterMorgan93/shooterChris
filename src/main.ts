import { Application, Graphics } from "pixi.js";

(async () => {
  const app = new Application();

  await app.init({ background: "#1099bb", width: 1024, height: 768 });

  document.body.appendChild(app.canvas);

  class Player extends Graphics {
    radius: number;
    color: string;

    constructor(radius: number, color: string) {
      super();
      this.radius = radius;
      this.color = color;
      this.draw();
    }

    draw() {
      this.circle(
        app.canvas.width / 2,
        app.canvas.height / 2,
        this.radius
      ).fill({
        color: this.color,
        alpha: 1,
      });
    }
  }

  const player = new Player(50, "0xff0000");
  app.stage.addChild(player);
})();
