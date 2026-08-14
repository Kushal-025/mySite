import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: -100, y: -100 };

    // --- Resize ---
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // --- Mouse tracking ---
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ========================
    // 1. SHOOTING STARS
    // ========================
    class ShootingStar {
      constructor() {
        this.reset();
      }
      reset() {
        // Start from random top/right edges
        if (Math.random() > 0.5) {
          this.x = Math.random() * canvas.width;
          this.y = -10;
        } else {
          this.x = canvas.width + 10;
          this.y = Math.random() * canvas.height * 0.6;
        }
        this.length = Math.random() * 120 + 60;
        this.speed = Math.random() * 8 + 4;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4; // ~45° downward-left
        this.vx = -Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.width = Math.random() * 2 + 0.5;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.color = Math.random() > 0.6
          ? `rgba(99, 102, 241, ${this.opacity})`   // indigo
          : Math.random() > 0.5
          ? `rgba(6, 182, 212, ${this.opacity})`     // cyan
          : `rgba(255, 255, 255, ${this.opacity})`;  // white
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0 || this.x < -200 || this.y > canvas.height + 100) {
          this.reset();
        }
      }
      draw() {
        const tailX = this.x - this.vx * (this.length / this.speed);
        const tailY = this.y - this.vy * (this.length / this.speed);

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/, `${this.opacity})`));
        gradient.addColorStop(1, this.color.replace(/[\d.]+\)$/, '0)'));

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.opacity * 0.8})`);
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const shootingStars = [];
    const maxShootingStars = 8;
    for (let i = 0; i < maxShootingStars; i++) {
      const star = new ShootingStar();
      // Stagger initial appearances
      star.opacity = Math.random() * 0.5;
      shootingStars.push(star);
    }

    // ========================
    // 2. TWINKLING STARS (static background dots)
    // ========================
    class TwinklingStar {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.baseOpacity = Math.random() * 0.5 + 0.2;
        this.opacity = this.baseOpacity;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }
      update(time) {
        this.opacity = this.baseOpacity + Math.sin(time * this.twinkleSpeed + this.twinklePhase) * 0.3;
        if (this.opacity < 0) this.opacity = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const twinklingStars = [];
    for (let i = 0; i < 80; i++) {
      twinklingStars.push(new TwinklingStar());
    }

    // ========================
    // 3. CURSOR TRAIL PARTICLES
    // ========================
    const cursorParticles = [];
    let lastSpawnTime = 0;

    class CursorParticle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y + (Math.random() - 0.5) * 12;
        this.size = Math.random() * 4 + 1.5;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2 - 1; // float upward
        this.opacity = 1;
        this.decay = Math.random() * 0.025 + 0.015;
        this.hue = Math.random() > 0.5 ? 240 : 185; // indigo or cyan
        this.saturation = 80 + Math.random() * 20;
        this.lightness = 55 + Math.random() * 20;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.97;
        this.opacity -= this.decay;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity * 0.6})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // ========================
    // ANIMATION LOOP
    // ========================
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // Draw twinkling background stars
      twinklingStars.forEach((star) => {
        star.update(time);
        star.draw();
      });

      // Draw shooting stars
      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });

      // Spawn cursor particles on mouse move
      const now = Date.now();
      if (mouse.x > 0 && mouse.y > 0 && now - lastSpawnTime > 25) {
        for (let i = 0; i < 3; i++) {
          cursorParticles.push(new CursorParticle(mouse.x, mouse.y));
        }
        lastSpawnTime = now;
      }

      // Update & draw cursor particles
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        cursorParticles[i].update();
        cursorParticles[i].draw();
        if (cursorParticles[i].opacity <= 0 || cursorParticles[i].size < 0.3) {
          cursorParticles.splice(i, 1);
        }
      }

      // Cap cursor particles for performance
      while (cursorParticles.length > 120) {
        cursorParticles.shift();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
