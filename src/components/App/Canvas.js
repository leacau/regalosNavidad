import React, { useEffect, useRef } from 'react';

const FireworksCanvas = () => {
	const canvasRef = useRef(null);
	const enVista = document.visibilityState;

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles = [];
		const colors = [
			'#ff6347',
			'#87ceeb',
			'#32cd32',
			'#ffd700',
			'#ff69b4',
			'#ffa500',
		];
		const gravity = 1.5; // Gravedad
		const bounce = 0.6; // Factor de rebote

		// Crear un grupo de partículas para simular un fuego artificial
		const createFirework = (x, y) => {
			for (let i = 0; i < 80; i++) {
				particles.push({
					x: x,
					y: y,
					angle: Math.random() * 2 * Math.PI,
					speed: Math.random() * 5 + 2, // Velocidad inicial variada
					radius: Math.random() * 3 + 1, // Tamaño de la partícula
					color: colors[Math.floor(Math.random() * colors.length)], // Color aleatorio
					life: 100, // Tiempo de vida
					opacity: 1, // Transparencia inicial
					decay: Math.random() * 0.015 + 0.005, // Decadencia de la opacidad
					trail: [],
				});
			}
		};

		const updateParticles = () => {
			particles.forEach((p, i) => {
				p.x += Math.cos(p.angle) * p.speed;
				p.y += Math.sin(p.angle) * p.speed + gravity; // Añadir gravedad
				p.speed *= 0.98; // Simula la gravedad al reducir la velocidad
				p.opacity -= p.decay; // Reduce la opacidad con el tiempo

				// Rebote en los bordes del canvas
				if (p.x <= 0 || p.x >= canvas.width) {
					p.angle = Math.PI - p.angle;
					p.speed *= bounce;
				}
				if (p.y <= 0 || p.y >= canvas.height) {
					p.angle = -p.angle;
					p.speed *= bounce;
				}

				// Almacena el rastro de la partícula
				if (p.trail.length < 10) {
					p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
				} else {
					p.trail.shift(); // Limita el tamaño de la estela
					p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
				}

				if (p.opacity <= 0) {
					particles.splice(i, 1); // Eliminar partículas agotadas
				}
			});
		};

		const drawParticles = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((p) => {
				// Dibuja la estela
				p.trail.forEach((t, index) => {
					ctx.beginPath();
					ctx.arc(t.x, t.y, p.radius * 1, 0, 4 * Math.PI);
					ctx.fillStyle = `rgba(255, 255, 255, ${
						t.opacity * (index / p.trail.length)
					})`;
					ctx.fill();
				});

				// Dibuja la partícula principal
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
				ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.opacity})`;
				ctx.fill();
			});
		};

		const hexToRgb = (hex) => {
			const bigint = parseInt(hex.slice(1), 16);
			const r = (bigint >> 16) & 255;
			const g = (bigint >> 8) & 255;
			const b = bigint & 255;
			return `${r}, ${g}, ${b}`;
		};

		const loop = () => {
			updateParticles();
			drawParticles();
			requestAnimationFrame(loop);
		};

		const launchFirework = () => {
			const x = Math.random() * canvas.width; // Posición aleatoria en X
			const y = Math.random() * canvas.height * 0.5; // Posición aleatoria en la mitad superior
			createFirework(x, y);
		};

		// Lanzar fuegos artificiales automáticamente
		const interval = setInterval(launchFirework, 900);

		loop();

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				zIndex: 2,
				backgroundColor: 'transparent',
			}}
		/>
	);
};

export default FireworksCanvas;
