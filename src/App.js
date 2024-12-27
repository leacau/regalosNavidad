import { Route, Router, Routes } from 'react-router-dom';

import Ganador from './components/Ganador/Ganador';
import React from 'react';
import Start from './components/App/Start';

function App() {
	return (
		<div className='divApp'>
			<Routes>
				<Route path='/' element={<Start />} />
				<Route path='/ganador' element={<Ganador />} />
			</Routes>
		</div>
	);
}

export default App;
