import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render
                    // (
                    //   <React.StrictMode>
                    //     <CssBaseline />
                    //     <App />
                    //   </React.StrictMode>,
                    // )

                    (<>
                        <CssBaseline />
                        <App />
                     </>   
                    )

