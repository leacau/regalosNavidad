import React, { useEffect, useState } from 'react';

import Ganador from '../Ganador/Ganador';
import Pregunta from '../Pregunta/Pregunta';
import Resultado from '../Resultado/Resultado';
import error from '../../assets/audios/error.mp3';
import good from '../../assets/audios/good.mp3';
import music from '../../assets/audios/musicStart.ogg';
import preguntasData from '../../json/preguntas.json'; // Importa las preguntas
import startVideo from '../../assets/videos/start.mp4';
import styles from './App.module.css';
import useSound from 'use-sound';

function Start() {
	const [preguntaActual, setPreguntaActual] = useState(0);
	const [jugar, setJugar] = useState(false);
	const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
	const [mostrarResultado, setMostrarResultado] = useState(false);
	const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
	const [play, { stop, isPlaying }] = useSound(music);
	const [playError, { stopError, isPlayingError }] = useSound(error);
	const [playGood, { stopGood, isPlayingGood }] = useSound(good);

	const manejarRespuesta = (indice) => {
		setRespuestaSeleccionada(indice);
		setMostrarResultado(true);
		if (indice === preguntasData[preguntaActual].correcta) {
			setRespuestasCorrectas(respuestasCorrectas + 1);
		}
	};

	const siguientePregunta = () => {
		setMostrarResultado(false);
		setRespuestaSeleccionada(null);
		if (preguntaActual < preguntasData.length - 1) {
			setPreguntaActual(preguntaActual + 1);
		}
	};

	if (respuestaSeleccionada === preguntasData[preguntaActual].correcta) {
		playGood();
	} else if (
		respuestaSeleccionada !== null &&
		respuestaSeleccionada !== preguntasData[preguntaActual].correcta
	) {
		playError();
	}

	return (
		<>
			{!jugar && (
				<div className={styles.start}>
					<video loop autoPlay>
						<source src={startVideo} type='video/mp4'></source>
					</video>
					{play()}
					<button
						className={styles.startButton}
						onClick={() => (setJugar(true), stop())}
					>
						Vamo' a Jugaaa'!
					</button>
				</div>
			)}
			{jugar && (
				<div className={styles.app} id='app'>
					{respuestasCorrectas !== 3 && <h1>¿Cuánto sabés?</h1>}
					{respuestasCorrectas === 3 ? (
						<Ganador premio={40000} />
					) : preguntaActual < preguntasData.length ? (
						<>
							<Pregunta
								pregunta={preguntasData[preguntaActual].pregunta}
								respuestas={preguntasData[preguntaActual].respuestas}
								manejarRespuesta={manejarRespuesta}
								respuestaSeleccionada={respuestaSeleccionada}
							/>
							{mostrarResultado && (
								<Resultado
									esCorrecta={
										respuestaSeleccionada ===
										preguntasData[preguntaActual].correcta
									}
									siguientePregunta={siguientePregunta}
								/>
							)}
						</>
					) : (
						<p>
							Juego terminado. Has respondido {respuestasCorrectas} preguntas
							correctamente.
						</p>
					)}
				</div>
			)}
		</>
	);
}

export default Start;
