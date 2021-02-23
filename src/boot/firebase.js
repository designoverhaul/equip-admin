import {boot} from 'quasar/wrappers'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
// import firestore from 'firebase/firestore' // not used but needed
import config from '../plugins/env.json'

export const fireApp = firebase.initializeApp(config)
export const AUTH = fireApp.auth()
export const firestore = fireApp.firestore()
export const firestorage = fireApp.storage()

export default boot(({app}) => {
  app.config.globalProperties.$auth = AUTH
  app.config.globalProperties.$firestore = firestore
  app.config.globalProperties.$firestorage = firestorage
})
