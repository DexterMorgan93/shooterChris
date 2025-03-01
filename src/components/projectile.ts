import { Application, Graphics } from "pixi.js";

interface ProjectileI {
  app: Application;

  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
}

class Projectile extends Graphics {
  app: Application;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };

  constructor(options: ProjectileI) {
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

export { Projectile };
