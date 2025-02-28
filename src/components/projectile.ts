import { Application, Graphics } from "pixi.js";

interface ProjectileI {
  app: Application;
  posX: number;
  posY: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
}

class Projectile extends Graphics {
  app: Application;
  posX: number;
  posY: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };

  constructor(options: ProjectileI) {
    super();
    this.app = options.app;
    this.posX = options.posX;
    this.posY = options.posY;
    this.radius = options.radius;
    this.color = options.color;
    this.velocity = options.velocity;
    this.draw();
  }

  draw() {
    this.circle(this.posX, this.posY, this.radius).fill({
      color: this.color,
      alpha: 1,
    });
  }
}

export { Projectile };
