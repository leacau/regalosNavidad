/* import React, { useEffect, useState } from 'react';

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
	const [start, setStart] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
	const [mostrarResultado, setMostrarResultado] = useState(false);
	const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
	const [play, { stop }] = useSound(music, {
		onload: () => {
			setPlaying(true);
		},
		onend: () => {
			setPlaying(false);
		},
		volume: 1,
	});
	const [playError] = useSound(error);
	const [playGood] = useSound(good);

	useEffect(() => {
		if (playing && !jugar) {
			play();
		}
	}, [playing]);

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
			{!jugar && !start && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						backgroundColor: '#282c34',
					}}
				>
					<button
						onClick={() => setStart(true)}
						className={styles.homeButton}
						style={{
							fontSize: '2rem',
							padding: '1rem 2rem',
							backgroundColor: '#61dafb',
							color: '#282c34',
							border: 'none',
							borderRadius: '8px',
							cursor: 'pointer',
							transition: 'transform 0.2s',
							opacity: '0',
						}}
						onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
						onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
					>
						¡Iniciar!
					</button>
				</div>
			)}
			{!jugar && start && (
				<div className={styles.start}>
					<video loop autoPlay preload='auto'>
						<source src={startVideo} type='video/mp4'></source>
					</video>

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
 */

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
	const [preguntas, setPreguntas] = useState([]); // Usaremos este estado para las preguntas mezcladas
	const [preguntaActual, setPreguntaActual] = useState(0);
	const [jugar, setJugar] = useState(false);
	const [start, setStart] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
	const [mostrarResultado, setMostrarResultado] = useState(false);
	const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
	const [play, { stop }] = useSound(music, {
		onload: () => {
			setPlaying(true);
		},
		onend: () => {
			setPlaying(false);
		},
		volume: 1,
	});
	const [playError] = useSound(error);
	const [playGood] = useSound(good);

	// Función para mezclar las preguntas
	const mezclarPreguntas = (preguntas) => {
		const mezcladas = [...preguntas];
		for (let i = mezcladas.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]]; // Intercambia los elementos
		}
		return mezcladas;
	};

	// Cargar y mezclar preguntas al inicio
	useEffect(() => {
		const preguntasMezcladas = mezclarPreguntas(preguntasData);
		setPreguntas(preguntasMezcladas);
	}, []);

	useEffect(() => {
		if (playing && !jugar) {
			play();
		}
	}, [playing]);

	const manejarRespuesta = (indice) => {
		setRespuestaSeleccionada(indice);
		setMostrarResultado(true);
		if (indice === preguntas[preguntaActual].correcta) {
			setRespuestasCorrectas(respuestasCorrectas + 1);
		}
	};

	const siguientePregunta = () => {
		setMostrarResultado(false);
		setRespuestaSeleccionada(null);
		if (preguntaActual < preguntas.length - 1) {
			setPreguntaActual(preguntaActual + 1);
		}
	};

	if (respuestaSeleccionada === preguntas[preguntaActual]?.correcta) {
		playGood();
	} else if (
		respuestaSeleccionada !== null &&
		respuestaSeleccionada !== preguntas[preguntaActual]?.correcta
	) {
		playError();
	}

	return (
		<>
			{!jugar && !start && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						backgroundColor: '#282c34',
					}}
				>
					<button
						onClick={() => setStart(true)}
						className={styles.homeButton}
						style={{
							fontSize: '2rem',
							padding: '1rem 2rem',
							backgroundColor: '#61dafb',
							color: '#282c34',
							border: 'none',
							borderRadius: '8px',
							cursor: 'pointer',
							transition: 'transform 0.2s',
						}}
						onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
						onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
					>
						¡Iniciar!
					</button>
				</div>
			)}
			{!jugar && start && (
				<div className={styles.start}>
					<video loop autoPlay preload='auto'>
						<source src={startVideo} type='video/mp4'></source>
					</video>

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
					{respuestasCorrectas !== 3 && (
						<h1 className={styles.titleGral}>¿Cuánto sabés?</h1>
					)}
					{respuestasCorrectas === 3 ? (
						<Ganador premio={40000} />
					) : preguntaActual < preguntas.length ? (
						<>
							<Pregunta
								pregunta={preguntas[preguntaActual].pregunta}
								respuestas={preguntas[preguntaActual].respuestas}
								manejarRespuesta={manejarRespuesta}
								respuestaSeleccionada={respuestaSeleccionada}
							/>
							{mostrarResultado && (
								<Resultado
									esCorrecta={
										respuestaSeleccionada === preguntas[preguntaActual].correcta
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
