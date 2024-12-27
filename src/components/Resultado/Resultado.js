import React, { useEffect, useState } from 'react';

import good from '../../assets/audios/good.mp3';
import styles from './Resultado.module.css';
import useSound from 'use-sound';

function Resultado({ esCorrecta, siguientePregunta, sonido }) {
	const [result, setResult] = useState(null);
	const [play, { stop, isPlaying }] = useSound(sonido);
	const [playGood, { stopGood, isPlayingGood }] = useSound(good);

	useEffect(() => {
		console.log(sonido);
		play();
		if (esCorrecta) {
			setResult(<p className={styles.correcto}>¡Correcto!</p>);
		} else {
			play();
			setResult(<p className={styles.incorrecto}>Incorrecto</p>);
		}
	}, []);

	return (
		<div className={styles.resultado}>
			<div className={styles.mensaje}>{result}</div>
			<button className={styles.siguiente} onClick={siguientePregunta}>
				Siguiente Pregunta
			</button>
		</div>
	);
}

export default Resultado;
