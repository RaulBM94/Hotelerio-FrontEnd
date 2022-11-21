import axios from 'axios'

const API = axios.create({
  baseURL: 'https://hotelerio-backend-api.onrender.com/api'
})

async function signup(newUser) {
  const { data: { token, email } } = await API.post('/auth/signup', newUser)
  localStorage.setItem('token', token)
  localStorage.setItem('email', email)

  //Creamos un CustomEvent que se dispara cada vez que cambiamos valores en localStorage
  window.dispatchEvent(new CustomEvent('localstorage-changed', {
    detail: {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email')
    }
  }))
  return token
}

async function login(newUser) {
  const { data: { token, email } } = await API.post('/auth/login', newUser)
  localStorage.setItem('token', token)
  localStorage.setItem('email', email)

  window.dispatchEvent(new CustomEvent('localstorage-changed', {
    detail: {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email')
    }
  }))
  return token
}

async function getAvailableRooms(checkin, checkout) {
  const response = await API.get('/rooms/available', {
    params: {
      checkin,
      checkout
    }, headers: {
      token: localStorage.getItem('token')
    }
  })
  return response.data
}


export default {
  signup,
  login,
  getAvailableRooms
}