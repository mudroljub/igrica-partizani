// scene nemaju implementiran stop metod, trenutni je pauza
import scene from './rute.js'
import UI from 'core/UI.js'
import {sakrijPlatno, pokaziPlatno} from 'io/platno.js'

const sablon = () => {
  const izbornik = Object.keys(scene).map(key => 
    `<button value='${key}' class='js-start full'>${scene[key].naziv}</button>`
  ).join('')

  return `
    <h1>Partisan Games ★</h1>
    ${izbornik}
  `
}

let aktivnaScena = null
const glavniMeni = new UI(sablon, 'ui')

const pustiScenu = function(e) {
  if (!e.target.classList.contains('js-start')) return
  if (aktivnaScena) aktivnaScena.end()

  pokaziPlatno()
  glavniMeni.clear()
  aktivnaScena = new scene[e.target.value]()
  aktivnaScena.start()
}

document.addEventListener('click', pustiScenu)
glavniMeni.render()
sakrijPlatno()