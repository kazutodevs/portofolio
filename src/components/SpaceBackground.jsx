import React, { useEffect, useRef } from 'react';

export default function SpaceBackground({ mousePosition }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Generate stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinkleAmount: Math.random() * 0.4 + 0.2,
    }));

    let animationFrameId;
    let time = 0;

    const animate = () => {
      // Clear canvas dengan fade effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 14, 39, 0)');
      gradient.addColorStop(0.5, 'rgba(15, 21, 53, 0.08)');
      gradient.addColorStop(1, 'rgba(10, 14, 39, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw and update stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * star.twinkleAmount + (1 - star.twinkleAmount);
        
        // Distance to mouse for parallax effect
        const dx = mousePosition.x - star.x;
        const dy = mousePosition.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let offsetX = 0;
        let offsetY = 0;
        if (distance < 200) {
          const angle = Math.atan2(dy, dx);
          const move = (200 - distance) * 0.02;
          offsetX = Math.cos(angle) * move;
          offsetY = Math.sin(angle) * move;
        }

        ctx.fillStyle = `rgba(0, 212, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.strokeStyle = `rgba(0, 212, 255, ${star.opacity * twinkle * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.radius * 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw nebula blobs
      const nebulaNoise = (x, y, scale) => {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        
        for (let i = 0; i < 4; i++) {
          const nx = (x * frequency) / scale;
          const ny = (y * frequency) / scale;
          
          // Simple noise function
          const noise = Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453;
          value += amplitude * (noise - Math.floor(noise));
          
          amplitude *= 0.5;
          frequency *= 2;
        }
        return value / 2;
      };

      // Nebula positions
      const nebulas = [
        { x: -100, y: -100, color: [59, 130, 246], scale: 400 },
        { x: canvas.width + 100, y: canvas.height + 100, color: [167, 102, 255], scale: 500 },
        { x: canvas.width / 2, y: canvas.height / 2, color: [0, 212, 255], scale: 600 },
      ];

      nebulas.forEach((nebula) => {
        const imageData = ctx.createImageData(300, 300);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const pixelIndex = i / 4;
          const x = pixelIndex % 300;
          const y = Math.floor(pixelIndex / 300);

          const noiseValue = nebulaNoise(x + nebula.x, y + nebula.y, nebula.scale);
          const dist = Math.sqrt(
            Math.pow(x - 150, 2) + Math.pow(y - 150, 2)
          ) / 150;

          const alpha = Math.max(0, (1 - dist) * noiseValue) * 5;

          data[i] = nebula.color[0];
          data[i + 1] = nebula.color[1];
          data[i + 2] = nebula.color[2];
          data[i + 3] = Math.min(255, alpha * 15);
        }

        ctx.putImageData(imageData, nebula.x - 150, nebula.y - 150);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #0f1535 50%, #141e3d 100%)' }}
    />
  );
}