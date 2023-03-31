import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routing } from '../../Layout/routing'
import { SnackAppBar } from '../Tools/SnackAppBar'
import { Provider } from 'react-redux'
import { orderReducer } from '../Slices/orderSlice'
import { configureStore } from '@reduxjs/toolkit'
import { snackMessageReducer } from '../Slices/snackMessageSlice'
import BackdropApp from '../Tools/BackdropApp'

export const store = configureStore( {
	reducer : {
		order : orderReducer,
		snackMessage : snackMessageReducer
	}
})

export const App = () => {

	return (
		<Provider store={store}>
			<div className="App">
				<RouterProvider
					router={routing}
					fallbackElement = {<BackdropApp open={true}></BackdropApp>}
				/>
				<SnackAppBar></SnackAppBar>
			</div>
		</Provider>
	)
}

export default App
