/* eslint-disable no-redeclare */
/* global alert */
/* eslint no-undef: "error" */

import store from '../redux/store'
import { updateUserInfo } from '../redux/action'
import { useSelector } from 'react-redux'

function Information() {
  let prenom = useSelector((state) => state.user.prenom)
  let nom = useSelector((state) => state.user.nom)

  function editData() {
    const divInfo = document.getElementsByClassName('information')[0]
    if (divInfo !== undefined) {
      const button = divInfo.lastChild
      button.style.display = 'none'
      divInfo.firstChild.textContent = 'Welcome back'

      const inputPrenom = document.createElement('input')
      const inputNom = document.createElement('input')
      const buttonSave = document.createElement('button')
      const buttonCancel = document.createElement('button')
      const divButton = document.createElement('div')

      divInfo.appendChild(inputPrenom)
      divInfo.appendChild(inputNom)
      divButton.appendChild(buttonSave)
      divButton.appendChild(buttonCancel)
      divInfo.appendChild(divButton)
      inputPrenom.value = prenom
      inputNom.value = nom
      buttonSave.textContent = 'Save'
      buttonCancel.textContent = 'Cancel'
      buttonSave.classList.add('sign-in-button')
      buttonSave.classList.add('buttonEdit')
      buttonCancel.classList.add('sign-in-button')
      buttonCancel.classList.add('buttonEdit')
      buttonSave.addEventListener('click', () => {
        if (prenom !== inputPrenom.value || nom !== inputNom.value) {
          store.dispatch(updateUserInfo(inputPrenom.value, inputNom.value))
          prenom = inputPrenom.value
          nom = inputNom.value
          buttonCancel.click()
          alert('Change made successfuly')
        }
      })
      buttonCancel.addEventListener('click', () => {
        divInfo.removeChild(inputPrenom)
        divInfo.removeChild(inputNom)
        divInfo.removeChild(divButton)
        button.style.display = 'initial'
        divInfo.firstChild.innerHTML =
          'Welcome back <br /> ' + prenom + ' ' + nom
      })
    }
  }

  return (
    <div className="information">
      <h1>
        {' '}
        Welcome back <br /> {prenom} {nom}{' '}
      </h1>
      <button
        onClick={(e) => {
          editData()
        }}
      >
        {' '}
        Edit Name{' '}
      </button>
    </div>
  )
}

export default Information
