import React, { useEffect, useState } from 'react';

import FireworksCanvas from '../App/Canvas';
import fireworkSound from '../../assets/audios/fireworks.mp3';
import premio from '../../assets/videos/premio.mp4';
import styles from './Ganador.module.css';
import useSound from 'use-sound';

const Ganador = (participante) => {
	const [play, { stop, isPlaying }] = useSound(fireworkSound);
	const [cbuAlias, setCbuAlias] = useState(''); // Estado para capturar el CBU o alias
	const [enVista, setEnVista] = useState(''); // Estado para capturar el CBU o alias
	const [user, setUser] = useState('');

	useEffect(() => {
		setUser(participante.participante);
		setEnVista(document.visibilityState);
		console.log(enVista);
	}, [enVista]);
	const handleEnviarWhatsApp = () => {
		if (cbuAlias.trim() === '') {
			alert('Por favor, ingresa tu CBU o alias');
			return;
		}

		// Formatea el mensaje para WhatsApp
		const mensaje = `¡Hola Papá Noel! Gané y quiero mi regalo!!. Mi CBU/Alias es: ${encodeURIComponent(
			cbuAlias
		)}`;
		const url = `https://wa.me/3425051513?text=${mensaje}`;

		// Abre WhatsApp en una nueva pestaña
		window.open(url, '_blank');
	};

	return (
		<>
			<div className={styles.premioGan}>
				{play()}
				<video autoPlay>
					<source src={premio} type='video/mp4'></source>
				</video>
			</div>
			{user === 'otro' && (
				<>
					<div className={styles.premioGanButton}>
						<h1 className={styles.h1Title}>¡Esaaaa ¡Ganaste!!! 🎉</h1>
						<h3 className={styles.h3Text}>Qué querés?? Regalo?? Naaaaaa 💸</h3>
						<p>Nada más lindo que la satisfacción de la victoria</p>
					</div>
				</>
			)}
			{user !== 'otro' && (
				<>
					<div className={styles.premioGanButton}>
						<h1 className={styles.h1Title}>¡Esaaaa, wachoo! ¡Ganaste!!! 🎉</h1>
						<h3 className={styles.h3Text}>
							Mandá tu CVU o alias por WhatsApp para recibir el regalo 💸
						</h3>
					</div>
					<div className={styles.waField}>
						<input
							type='text'
							placeholder='Ingresa tu CBU o alias'
							value={cbuAlias}
							onChange={(e) => setCbuAlias(e.target.value)} // Actualiza el estado con cada cambio
							className={styles.inputField}
						/>
						<button className={styles.whatsapp} onClick={handleEnviarWhatsApp}>
							Enviar
						</button>
					</div>
				</>
			)}
			<FireworksCanvas />
		</>
	);
};

export default Ganador;
