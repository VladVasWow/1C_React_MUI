import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routing } from '../../Layout/routing'
import { SnackAppBar } from '../Tools/SnackAppBar'

export const App = () => {

	return (

		<div className="App">
			<RouterProvider
				router={routing}
			/>
		</div>
	)
}

export default App
