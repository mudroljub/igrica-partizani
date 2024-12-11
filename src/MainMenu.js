import Scena from 'core/Scena.js'
import scene from './rute.js'
import UI from 'core/UI.js'

const sablon = () => {
  const izbornik = Object.keys(scene).map(key => 
    `<button value='${key}' class='js-start full'>${scene[key].naziv}</button>`
  ).join('')

  return `
    <h1>Partisan Games ★</h1>
    ${izbornik}
  `
}

const ui = new UI(sablon, 'ui')

export default class MainMenu extends Scena {
  constructor(manager) {
      super()
      this.manager = manager
      this.pustiScenu = this.pustiScenu.bind(this)
  }

  start() {
      super.start()
      document.addEventListener('click', this.pustiScenu)
  }

  pustiScenu(e) {
    if (!e.target.classList.contains('js-start')) return

    this.manager.start(new scene[e.target.value](this.manager))
  }

  end() {
      super.end()
      document.removeEventListener('click', this.pustiScenu)
  }

  render() {
    super.render()
    ui.render()
  }
}