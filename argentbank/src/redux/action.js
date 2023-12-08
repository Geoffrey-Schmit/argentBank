/* eslint-disable no-redeclare */
/* global fetch */
/* eslint no-undef: "error" */

import store from './store'

// Actions pour gérer les états de chargement, d'erreur et de connexion/déconnexion
const dataFetching = () => ({ type: 'loading' })
const dataError = () => ({ type: 'error' })
const connexionAction = (data) => ({ type: 'connexion', payload: data })
const profileAction = (data) => ({ type: 'profile', payload: data })
const updateUserAction = (data) => ({ type: 'updateUser', payload: data })
const deconnexionAction = () => ({ type: 'deconnexion' })

// Action pour déconnecter l'utilisateur
export function deconnexion() {
  return function (dispatch) {
    dispatch(deconnexionAction())
  }
}

// Action pour la connexion avec email et mot de passe
export function login(email, password) {
  return function (dispatch) {
    try {
      dispatch(dataFetching())
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ email: email, password: password }),
      }
      // Requête pour la connexion à l'API
      fetch('http://localhost:3001/api/v1/user/login', requestOptions).then(
        function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              dispatch(connexionAction(data))
              dispatch(profile())
            })
          } else {
            dispatch(dataError())
          }
        }
      )
    } catch (error) {
      dispatch(dataError())
    }
  }
}

// Action pour récupérer le profil de l'utilisateur
export function profile() {
  return function (dispatch) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer' + store.getState().token,
        },
      }
      // Requête pour récupérer le profil de l'utilisateur depuis l'API
      fetch('http://localhost:3001/api/v1/user/profile', requestOptions).then(
        function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              dispatch(profileAction(data))
            })
          }
        }
      )
    } catch (error) {
      dispatch(dataError())
    }
  }
}

// Action pour mettre à jour les informations de l'utilisateur
export function updateUserInfo(prenom, nom) {
  return function (dispatch) {
    try {
      dispatch(dataFetching())
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer' + store.getState().token,
        },
        body: JSON.stringify({ firstName: prenom, lastName: nom }),
      }
      // Requête pour mettre à jour les informations de l'utilisateur
      fetch('http://localhost:3001/api/v1/user/profile', requestOptions).then(
        function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              dispatch(updateUserAction(data))
            })
          }
        }
      )
    } catch (error) {
      dispatch(dataError())
    }
  }
}
