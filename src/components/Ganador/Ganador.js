import FireworksCanvas from '../App/Canvas';
import React from 'react';
import fireworkSound from '../../assets/audios/fireworks.mp3';
import premio from '../../assets/videos/premio.mp4';
import styles from './Ganador.module.css';
import useSound from 'use-sound';

const Ganador = () => {
	const [play, { stop, isPlaying }] = useSound(fireworkSound);
	return (
		<div className={styles.premioGan}>
			{play()}
			<video autoPlay>
				<source src={premio} type='video/mp4'></source>
			</video>
			<button className={styles.premioGanButton}>
				<h1>¡Felicidades! Ganaste $40.000</h1>
				<h3>Envié tu CVU o alias </h3>
			</button>
			<FireworksCanvas />
		</div>
	);
};

export default Ganador;
