import { initialeState } from './store'

export function reducer(state, action) {
  // Vérifie si l'état est indéfini, puis lui assigne l'état initial par défaut
  if (state === undefined) {
    state = initialeState
  }
  switch (action.type) {
    case 'error':
      return { ...state, status: 'error' } // Indique un état d'erreur
    case 'loading':
      return { ...state, status: 'loading' } // Indique un état de chargement
    case 'connexion': {
      return { ...state, token: action.payload.body.token, status: 'connexion' } // Met à jour l'état de connexion avec un token
    }
    case 'profile': {
      return {
        ...state,
        connected: true,
        status: 'connecté',
        user: {
          ...state.user,
          prenom: action.payload.body.firstName,
          nom: action.payload.body.lastName,
        },
      } // Met à jour le profil de l'utilisateur et indique un état de connexion réussie
    }
    case 'updateUser': {
      return {
        ...state,
        user: {
          ...state.user,
          prenom: action.payload.body.firstName,
          nom: action.payload.body.lastName,
        },
      } // Met à jour les informations de l'utilisateur
    }
    case 'deconnexion': {
      return {
        ...state,
        connected: false,
        token: '',
        status: 'vide',
        user: {
          ...state.user,
          prenom: '',
          nom: '',
        },
      } // Indique un état de déconnexion avec les informations réinitialisées
    }
    default:
  }
  return state
}
