import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/start'); // Navega a la pantalla Start.js
	};

	return (
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
				onClick={handleClick}
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
	);
};

export default Home;
