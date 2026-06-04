'use client';

import React, { useEffect, useRef } from 'react';

export default function TagCloud() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 350);
    let height = (canvas.height = canvas.parentElement.clientHeight || 350);

    const tags = [
      'Java', 'Spring Boot', 'Python', 'LangChain', 'FAISS', 
      'Next.js', 'React.js', 'PostgreSQL', 'Power Automate', 
      'REST APIs', 'Spring Security', 'Git', 'GitHub', 
      'Streamlit', 'Docker', 'Tableau', 'JDBC', 'LLMs'
    ];

    // Spherical coordinates config
    const numTags = tags.length;
    let radius = Math.min(width, height) * 0.4;
    const fov = 350;

    // Distribute tags uniformly on a sphere using Fibonacci distribution
    const items = tags.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i) / numTags);
      const theta = Math.sqrt(numTags * Math.PI) * phi;
      return {
        text,
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      };
    });

    // Rotation speeds (base + mouse-induced speeds)
    let speedX = 0.003;
    let speedY = 0.003;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Adjust rotation speed based on cursor distance from center
      speedY = (mouseX / (width / 2)) * 0.015;
      speedX = (-mouseY / (height / 2)) * 0.015;
    };

    const handleMouseLeave = () => {
      // Return to gentle default spin
      speedX = 0.003;
      speedY = 0.003;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 350;
      height = canvas.height = canvas.parentElement.clientHeight || 350;
      radius = Math.min(width, height) * 0.4;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Rotate sphere on axes
    const rotateX = (item, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = item.y * cos - item.z * sin;
      const z1 = item.z * cos + item.y * sin;
      item.y = y1;
      item.z = z1;
    };

    const rotateY = (item, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = item.x * cos - item.z * sin;
      const z1 = item.z * cos + item.x * sin;
      item.x = x1;
      item.z = z1;
    };

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Sort items by z depth to render back tags behind front tags (painter's algorithm)
      const sortedItems = [...items].sort((a, b) => b.z - a.z);

      sortedItems.forEach((item) => {
        // Continuous rotation on X and Y
        rotateX(item, speedX);
        rotateY(item, speedY);

        // Perspective scaling
        const scale = fov / (fov + item.z * radius);
        const px = item.x * radius * scale + width / 2;
        const py = item.y * radius * scale + height / 2;

        // Depth configurations (size and opacity)
        const alpha = (scale - 0.5) * 1.5; // map scale to alpha range [0.1, 1]
        if (alpha <= 0) return;

        // Custom font sizing based on z depth
        const fontSize = Math.floor(12 + scale * 8);

        ctx.font = `bold ${fontSize}px var(--font-display)`;
        
        // Colors: cyan/violet for front, muted slate for back
        if (item.z < 0) {
          // Front of the sphere (near)
          ctx.fillStyle = `rgba(6, 182, 212, ${Math.min(alpha, 1)})`; // secondary cyan
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
        } else {
          // Back of the sphere (far)
          ctx.fillStyle = `rgba(148, 163, 184, ${Math.min(alpha * 0.7, 0.5)})`; // muted slate
          ctx.shadowBlur = 0;
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.text, px, py);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        margin: '0 auto',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    />
  );
}
