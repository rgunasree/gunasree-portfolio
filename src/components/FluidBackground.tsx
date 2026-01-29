import { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let particles: Particle[] = [];

    let time = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, 255, ${this.opacity})`;
      }

      update() {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(100 / distance, 2);

        this.vx += (dx / distance) * force * 0.01;
        this.vy += (dy / distance) * force * 0.01;

        this.vx *= 0.95;
        this.vy *= 0.95;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01; // Increment time for animation

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Smurf Theme Colors
        // Primary: #00d7ff (RGB: 0, 215, 255)
        // Secondary: #88CCFF (RGB: 136, 204, 255)
        // Dark: #0055aa (RGB: 0, 85, 170)

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * (1 + Math.sin(time * 2 + i) * 0.2)
        );

        // Use Smurf blue palette with varying opacities
        gradient.addColorStop(0, `rgba(0, 215, 255, ${0.15 * particle.opacity})`); // Bright Smurf Blue
        gradient.addColorStop(0.5, `rgba(136, 204, 255, ${0.1 * particle.opacity})`); // Light Blue
        gradient.addColorStop(1, 'rgba(0, 85, 170, 0)'); // Dark Blue fade out

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-space-gradient"
    />
  );
}
