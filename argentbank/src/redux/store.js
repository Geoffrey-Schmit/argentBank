/* eslint-disable no-redeclare */
/* global localStorage */
/* eslint no-undef: "error" */

import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// État initial de l'application
export const initialeState = {
  users: null,
  connected: false,
  status: 'vide', // Indique un état initial vide
  user: {
    prenom: ' ',
    nom: ' ',
  },
  token: '',
  error: null,
}

// Fonction pour sauvegarder l'état dans le localStorage
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state)
    localStorage.setItem('persistantState', serialisedState)
  } catch (e) {
    console.warn(e)
  }
}

// Fonction pour charger l'état depuis le localStorage
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('persistantState')
    if (serialisedState === null) return undefined
    return JSON.parse(serialisedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

// Ensemble d'améliorations pour le store Redux avec le middleware thunk et l'extension Redux DevTools
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// Création du store Redux avec le reducer, l'état initial et les améliorations
const store = createStore(reducer, loadFromLocalStorage(), composedEnhancer)

// Abonnement du store aux changements pour sauvegarder l'état dans le localStorage
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store // Exportation du store Redux
