import React, { useEffect, useRef } from 'react';

import { Fireworks } from 'fireworks-js';

const FireworksEffect = () => {
	const fireworksRef = useRef(null);

	useEffect(() => {
		// Asegurarse de que el contenedor existe antes de inicializar los fuegos artificiales
		if (fireworksRef.current) {
			const fireworks = new Fireworks(fireworksRef.current, {
				rocketsPoint: 50, // Punto central de lanzamiento
				hue: { min: 0, max: 360 }, // Colores aleatorios
				speed: 3, // Velocidad
				acceleration: 1.05,
				particles: 150, // Número de partículas
				trace: 3, // Persistencia de la estela
				explosion: 5, // Tamaño de la explosión
			});

			fireworks.start();

			// Limpieza al desmontar el componente
			return () => fireworks.stop();
		}
	}, []);

	return (
		<div
			ref={fireworksRef}
			style={{
				width: '100vw',
				height: '100vh',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 1000, // Asegura que los fuegos artificiales estén al frente
				backgroundColor: 'transparent', // Fondo transparente
			}}
		/>
	);
};

export default FireworksEffect;
