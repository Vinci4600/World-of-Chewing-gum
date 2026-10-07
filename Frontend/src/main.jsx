import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Importieren

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
            {/* AuthProvider MUSS um die App herumliegen */}
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);