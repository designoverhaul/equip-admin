import {store} from 'quasar/wrappers'
import {createStore} from 'vuex'
import auth from './module-example'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./module-example'], () => {
      const newShowcase = require('./module-example').default
      store.hotUpdate({modules: {showcase: newShowcase}})
    })
  }
  return Store
})
