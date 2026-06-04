'use client';

import React, { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with interpolation (for smooth movement)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    // Scroll tracking
    let scrollSpeedOffset = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e) => {
      // Normalize coordinates to [-0.5, 0.5]
      mouse.targetX = (e.clientX / width) - 0.5;
      mouse.targetY = (e.clientY / height) - 0.5;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      scrollSpeedOffset = Math.min(diff * 0.1, 8); // temporary boost to speed
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Generate 3D stars
    const numStars = 250;
    const stars = [];
    const maxDepth = 1500;
    const fov = 300;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2.5,
        y: (Math.random() - 0.5) * height * 2.5,
        z: Math.random() * maxDepth,
        size: Math.random() * 1.5 + 0.5,
        // color palette: purples, cyans, and white
        color: i % 3 === 0 
          ? 'rgba(139, 92, 246, 0.8)' // primary violet
          : i % 3 === 1 
            ? 'rgba(6, 182, 212, 0.8)' // secondary cyan
            : 'rgba(255, 255, 255, 0.9)' // white
      });
    }

    // Main animation loop
    const animate = () => {
      // Clear canvas with a very slight opacity trail for motion blur
      ctx.fillStyle = 'rgba(3, 0, 20, 0.12)';
      ctx.fillRect(0, 0, width, height);

      // Lerp mouse coordinates for elastic easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Decay scroll-induced warp speed back to normal
      scrollSpeedOffset *= 0.92;

      stars.forEach((star) => {
        // Base travel speed + scroll warp speed
        star.z -= (1.5 + scrollSpeedOffset);

        // Reset stars that fly past the screen/camera
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * width * 2.5;
          star.y = (Math.random() - 0.5) * height * 2.5;
        }

        // Apply mouse-influenced parallax offset to simulated camera viewpoint
        // Camera shifts opposite to mouse direction
        const offsetX = star.x - (mouse.x * 350);
        const offsetY = star.y - (mouse.y * 350);

        // Standard 3D to 2D projection
        const px = (offsetX / star.z) * fov + width / 2;
        const py = (offsetY / star.z) * fov + height / 2;

        // Skip stars projected off-canvas
        if (px < 0 || px > width || py < 0 || py > height) return;

        // Depth size scale factor (closer is larger)
        const size = (1 - star.z / maxDepth) * star.size * 3.5;
        
        // Draw star
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.1, size), 0, Math.PI * 2);
        
        // Dynamic glow layer for closer stars
        if (star.z < maxDepth * 0.4) {
          ctx.shadowBlur = size * 2.5;
          ctx.shadowColor = star.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = star.color;
        ctx.fill();
      });

      // Reset shadow blur
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
