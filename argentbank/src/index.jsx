import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import User from './pages/User'
import { Provider } from 'react-redux'
import store from './redux/store'
import './Sass/main.scss'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Login" element={<Connexion />} />
          <Route path="/Profile/*" element={<User />} />
          <Route path="/*" element={<Connexion />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
)
