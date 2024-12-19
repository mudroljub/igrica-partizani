
import {sakrijPlatno, pokaziPlatno} from 'io/platno.js'
import SceneManager from './SceneManager.js'
import MainMenu from './MainMenu.js'

/*
let aktivnaScena = null

const pustiScenu = function(e) {
  if (!e.target.classList.contains('js-start')) return
  if (aktivnaScena) aktivnaScena.end()
    
  pokaziPlatno()
  glavniMeni.clear()
  aktivnaScena = new scene[e.target.value]()
  aktivnaScena.start()
}

const glavniMeni = new UI(sablon, 'ui')
glavniMeni.render()
sakrijPlatno()
*/

const manager = new SceneManager()
const meni = new MainMenu(manager)
meni.start()