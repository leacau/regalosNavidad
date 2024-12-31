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
import Swal from 'sweetalert2';
import error from '../../assets/audios/error.mp3';
import good from '../../assets/audios/good.mp3';
import music from '../../assets/audios/musicStart.ogg';
import noVideo from '../../assets/videos/no.gif';
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
	const [respuestasIncorrectas, setRespuestasIncorrectas] = useState(0);
	const [mostrarResultado, setMostrarResultado] = useState(false);
	const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
	const [participante, setParticipante] = useState('');
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

	const preguntaPorPartic = (preguntas) => {
		if (participante === 'jere') {
			const preguntasMezcladas = mezclarPreguntas(preguntasData[0]);
			setPreguntas(preguntasMezcladas);
		} else if (participante === 'marquis') {
			const preguntasMezcladas = mezclarPreguntas(preguntasData[1]);
			setPreguntas(preguntasMezcladas);
		} else {
			const preguntasMezcladas = mezclarPreguntas(preguntasData[2]);
			setPreguntas(preguntasMezcladas);
		}
	};
	// Cargar y mezclar preguntas al inicio
	useEffect(() => {
		preguntaPorPartic(preguntasData);
	}, [participante]);

	useEffect(() => {
		if (respuestasIncorrectas === 3 || respuestasIncorrectas > 4) {
			Swal.fire({
				title: '<strong>mmmmmmm</strong>',
				html: `<img src=${noVideo}/>`,
				focusConfirm: false,
				confirmButtonText: '<i class="fa fa-thumbs-up"></i> Volver a empezar!',
				confirmButtonColor: '#a1594a',
				confirmButtonAriaLabel: 'nop!',
			}).then((result) => {
				if (result.isConfirmed) {
					preguntaPorPartic(preguntasData);
					setRespuestasCorrectas(0);
					setRespuestasIncorrectas(0);
					setPreguntaActual(0);
					siguientePregunta();
				}
			});
		}
	}, [respuestasIncorrectas]);

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
		} else {
			setRespuestasIncorrectas(respuestasIncorrectas + 1);
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
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						backgroundColor: '#282c34',
					}}
				>
					<h3
						style={{
							color: 'red',
							fontSize: '1.7rem',
						}}
					>
						Atención, esto no va a ser facil...
					</h3>
					<p
						style={{
							color: 'White',
							fontSize: '1.5rem',
						}}
					>
						Condiciones:
					</p>
					<p
						style={{
							color: '#d8b336',
							fontSize: '1.5rem',
							margin: '0',
						}}
					>
						1- Con tres respuestas correctas, GANAS!
					</p>
					<p
						style={{
							color: '#d8b336',
							fontSize: '1.5rem',
							margin: '0',
						}}
					>
						2- Con tres respuestas incorrectas, EMPEZAS DE NUEVO!
					</p>
					<p
						style={{
							color: '#d8b336',
							fontSize: '1.5rem',
							marginTop: '0',
							marginBottom: '2rem',
						}}
					>
						3- No hay tres...
					</p>
					<select
						onChange={(e) => setParticipante(e.target.value)}
						style={{
							fontSize: '1.5rem',
							padding: '0.5rem 2rem',
							backgroundColor: 'white',
							color: '#282c34',
							border: 'none',
							borderRadius: '8px',
							cursor: 'pointer',
							transition: 'transform 0.2s',
							marginBottom: '1rem',
						}}
					>
						<option value=''>¿Quién va a jugar?</option>
						<option value='jere'>Jere</option>
						<option value='marquis'>Marquis</option>
						<option value='otro'>Otro</option>
					</select>

					{participante !== '' && (
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
					)}
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
						<Ganador participante={participante} />
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
							<div className={styles.correcto}>
								Respuestas correctas: {respuestasCorrectas}
							</div>
							<div className={styles.incorrecto}>
								Respuestas incorrectas: {respuestasIncorrectas}
							</div>
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
