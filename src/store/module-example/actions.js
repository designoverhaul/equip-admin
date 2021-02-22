import {fireApp} from 'boot/firebase'

export function loginUser({commit}, payload) {
  commit('setLoggedIn', true)
  localStorage.setItem('loggedIn', true)
}

export function logoutUser() {
  fireApp.signOut()
}

/*

export const actions = {
  loginUser({ commit }, payload) {
    fireApp.signInWithEmailAndPassword(
      payload.email, payload.password
    )
      .then(response => {
        console.log('response', response);
      })
      .catch(e => {
        console.log(e);
      })
  },
  logoutUser() {
    fireApp.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    debugger
    fireApp.onAuthStateChanged(user => {
      if (user) {
        commit('setLoggedIn', true)
        localStorage.setItem('loggedIn', true)
      } else {
        commit('setLoggedIn', false);
        localStorage.getItem('loggedIn', false)
      }
    })
  }
}
*/
