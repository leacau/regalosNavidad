import React from 'react';
import styles from './Pregunta.module.css';

function Pregunta({
	pregunta,
	respuestas,
	manejarRespuesta,
	respuestaSeleccionada,
}) {
	return (
		<div className={styles.preguntaContainer}>
			<h2>{pregunta}</h2>
			{respuestas.map((respuesta, index) => (
				<button
					className={styles.opcion}
					key={index}
					onClick={() => manejarRespuesta(index)}
					disabled={respuestaSeleccionada !== null}
				>
					{respuesta}
				</button>
			))}
		</div>
	);
}

export default Pregunta;
