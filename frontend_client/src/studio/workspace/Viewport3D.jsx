import React, { useEffect, useRef } from 'react';

/**
 * Viewport3D: placeholder 3D viewport that will display the 3D game map.
 * For now, it renders a simple canvas with a gradient background and a rotating square to simulate activity.
 * Replace this with real Three.js scene setup later.
 */
// PUBLIC_INTERFACE
export function Viewport3D() {
  /** Renders a full-size canvas with a simple animation to mimic a live 3D viewport. */
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let running = true;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      // background gradient
      const grd = ctx.createLinearGradient(0, 0, width, height);
      grd.addColorStop(0, '#0f1215');
      grd.addColorStop(1, '#13161a');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // grid
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#2a2d31';
      const grid = 24;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // "camera" frustum placeholder
      ctx.save();
      ctx.translate(width - 80, 50);
      ctx.strokeStyle = 'rgba(56,161,255,0.8)';
      ctx.fillStyle = 'rgba(56,161,255,0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(10, -10);
      ctx.lineTo(16, 0);
      ctx.lineTo(10, 10);
      ctx.lineTo(-10, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // rotating "mesh" placeholder
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(t);
      const size = 80;
      ctx.fillStyle = 'rgba(56,161,255,0.15)';
      ctx.strokeStyle = 'rgba(56,161,255,0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.fill();
      ctx.stroke();

      // axis gizmo
      ctx.lineWidth = 3;
      // X - red
      ctx.strokeStyle = '#ff5c5c';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(60, 0);
      ctx.stroke();
      // Y - green
      ctx.strokeStyle = '#2ecc71';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -60);
      ctx.stroke();
      // Z - blue (pseudo)
      ctx.strokeStyle = '#38a1ff';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-40, 40);
      ctx.stroke();
      ctx.restore();

      t += 0.01;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Viewport 3D Canvas"
      />
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        display: 'flex',
        gap: 8
      }}>
        <span className="pill">Camera: EditorCam</span>
        <span className="pill">Renderer: WebGL</span>
        <span className="pill">FPS: ~60</span>
      </div>
    </div>
  );
}
