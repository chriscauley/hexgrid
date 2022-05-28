import { ReactiveLocalStorage } from '@unrest/vue-storage'

const LS_KEY = 'STORE'
const initial = {
  board_length: 20,
  hex_radius: 0.8,
  space: 0.125,
  px_per_inch: 96,
  layout: 'board',
  board_radius: 6,
}

export default {
  install(app) {
    const store = ReactiveLocalStorage({ LS_KEY, initial })
    store.reset = () => store.save(initial)
    app.config.globalProperties.$local = store
  },
}
