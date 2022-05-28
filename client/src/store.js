import { ReactiveLocalStorage } from '@unrest/vue-storage'
import { defaults } from 'lodash'

const LS_KEY = 'STORE'
const initial = {
  board_length: 20,
  hex_radius: 0.8,
  space: 0.125,
  px_per_inch: 96,
  layout: 'board',
  board_radius: 6,
  piece_rows: 6,
}

export default {
  install(app) {
    const store = ReactiveLocalStorage({ LS_KEY, initial })
    defaults(store.state, initial)
    store.reset = () => store.save(initial)
    app.config.globalProperties.$local = store
  },
}
