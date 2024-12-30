import { Route, Router, Routes } from 'react-router-dom';

import Ganador from './components/Ganador/Ganador';
import Home from './components/App/Home';
import React from 'react';
import Start from './components/App/Start';

function App() {
	return (
		<div className='divApp'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Start' element={<Start />} />
				<Route path='/ganador' element={<Ganador />} />
			</Routes>
		</div>
	);
}

export default App;
