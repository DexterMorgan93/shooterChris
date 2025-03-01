import { Application, Graphics } from "pixi.js";

interface EnemyI {
  app: Application;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
}

class Enemy extends Graphics {
  app: Application;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };

  constructor(options: EnemyI) {
    super();
    this.app = options.app;
    this.radius = options.radius;
    this.color = options.color;
    this.velocity = options.velocity;
    this.draw();
  }

  draw = () => {
    this.circle(0, 0, this.radius).fill({
      color: this.color,
      alpha: 1,
    });
  };

  update = () => {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };
}

export { Enemy };
