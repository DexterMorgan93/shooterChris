import { Application, Graphics } from "pixi.js";

interface PlayerI {
  app: Application;
  radius: number;
  color: string;
}

class Player extends Graphics {
  app: Application;
  radius: number;
  color: string;

  constructor(options: PlayerI) {
    super();
    this.app = options.app;
    this.radius = options.radius;
    this.color = options.color;
    this.draw();
  }

  draw() {
    this.circle(
      this.app.canvas.width / 2,
      this.app.canvas.height / 2,
      this.radius
    ).fill({
      color: this.color,
      alpha: 1,
    });
  }
}

export { Player };
